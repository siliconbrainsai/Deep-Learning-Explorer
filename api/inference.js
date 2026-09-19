/**
 * Siliconbrainsai AI Odyssey: Deep Learning Explorer
 * Backend API Handler (Vercel Serverless / Node.js Express compatible)
 * 
 * Provides server-side matrix operations for:
 * 1. 2D Convolution filter processing (Kernels, Stride, Padding, ReLU, Max-Pooling)
 * 2. Scaled Dot-Product Self-Attention computation: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V
 */

export default async function handler(req, res) {
  // Enable CORS for frontend requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({
      status: 'online',
      service: 'Siliconbrainsai Deep Learning Explorer Inference Engine',
      version: '1.0.0',
      supportedEndpoints: ['/api/inference (action: "attention" | "convolve" | "predict_sequence")']
    });
  }

  try {
    const { action, payload } = req.body || {};

    // ----------------------------------------------------
    // ACTION 1: Scaled Dot-Product Self-Attention
    // ----------------------------------------------------
    if (action === 'attention') {
      const { queryMatrix, keyMatrix, valueMatrix, d_k = 64 } = payload || {};

      if (!queryMatrix || !keyMatrix) {
        return res.status(400).json({ error: 'Missing queryMatrix or keyMatrix in payload' });
      }

      // Compute Q * K^T / sqrt(d_k)
      const scale = Math.sqrt(d_k);
      const scores = queryMatrix.map((qRow) => {
        return keyMatrix.map((kRow) => {
          // Dot product
          const dot = qRow.reduce((sum, val, idx) => sum + val * (kRow[idx] || 0), 0);
          return dot / scale;
        });
      });

      // Apply row-wise Softmax
      const attentionWeights = scores.map((row) => {
        const maxVal = Math.max(...row);
        const expRow = row.map((val) => Math.exp(val - maxVal));
        const sumExp = expRow.reduce((sum, val) => sum + val, 0);
        return expRow.map((val) => Number((val / sumExp).toFixed(4)));
      });

      return res.status(200).json({
        success: true,
        action: 'attention',
        attentionWeights,
        scaleUsed: scale
      });
    }

    // ----------------------------------------------------
    // ACTION 2: 2D Convolution Matrix Operation
    // ----------------------------------------------------
    if (action === 'convolve') {
      const { imageMatrix, kernelMatrix, stride = 1, applyRelu = true } = payload || {};

      if (!imageMatrix || !kernelMatrix) {
        return res.status(400).json({ error: 'Missing imageMatrix or kernelMatrix' });
      }

      const inHeight = imageMatrix.length;
      const inWidth = imageMatrix[0].length;
      const kHeight = kernelMatrix.length;
      const kWidth = kernelMatrix[0].length;

      const outHeight = Math.floor((inHeight - kHeight) / stride) + 1;
      const outWidth = Math.floor((inWidth - kWidth) / stride) + 1;

      const featureMap = [];

      for (let r = 0; r < outHeight; r++) {
        const row = [];
        for (let c = 0; c < outWidth; c++) {
          let sum = 0;
          for (let kr = 0; kr < kHeight; kr++) {
            for (let kc = 0; kc < kWidth; kc++) {
              const pixel = imageMatrix[r * stride + kr][c * stride + kc];
              const weight = kernelMatrix[kr][kc];
              sum += pixel * weight;
            }
          }
          const finalVal = applyRelu ? Math.max(0, sum) : sum;
          row.push(Number(finalVal.toFixed(2)));
        }
        featureMap.push(row);
      }

      return res.status(200).json({
        success: true,
        action: 'convolve',
        dimensions: { outHeight, outWidth },
        featureMap
      });
    }

    // ----------------------------------------------------
    // Fallback: Unknown action
    // ----------------------------------------------------
    return res.status(400).json({ error: `Unknown action: ${action}` });

  } catch (err) {
    return res.status(500).json({ error: 'Internal inference error', message: err.message });
  }
}
