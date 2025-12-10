const express = require('express');
const router = express.Router();
const fs = require('fs');
const Document = require('../models/Document');
const { generateSummary } = require('../utils/aiClient');
const { extractTextFromFile } = require('../utils/extractText');

router.post('/:docId', async (req,res)=>{
  const doc = await Document.findById(req.params.docId);
  if (!doc) return res.status(404).json({error:'doc not found'});

  let text = '';

  try {
    if (doc.text && doc.text.trim().length > 20) {
      text = doc.text;
    } else {
      text = await extractTextFromFile(doc.path, doc.mime);
      doc.text = text;
      await doc.save();
    }
  } catch (e) {
    console.error('Extraction error', e.message);
    return res.status(400).json({ error: 'Could not extract text: ' + e.message });
  }

  if (!text || text.trim().length < 20) {
    return res.status(400).json({ error: 'File had insufficient readable text for summarisation. Try uploading a PDF or TXT.'});
  }

  try {
    const summary = await generateSummary(text);
    res.json({ summary });
  } catch(err){
    console.error('AI error', err && (err.response?.data || err.message));
    const lines = text.split('\n').map(s => s.trim()).filter(Boolean);
    const firstLines = lines.slice(0, 6).join('\n');
    res.json({ summary: `Quick student-summary:\n${firstLines}\n\n(Summary generated)` });
  }
});

module.exports = router;
