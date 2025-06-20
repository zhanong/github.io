---
title: Article Style LoRa Tuning
date: 2025-04-30
featureImage: img/20250430_cover.png
summary: My try of tuning a Deepseek LoRa.
tags: Python, LlamaFactory, LLM
---

<div class="video-container">
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=114702302650242&bvid=BV1bBN5zHE9u&cid=30556491125&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
</div>

- **Objective:** My goal was to train a Lora model to automatically write project descriptions in the unique style of an architectural firm, known for its concise language, use of quotes, and parallel Chinese-English text.
- **Initial Challenge:** My first attempt failed because my training dataset of 50 full articles was too small. For this, I had used Gemini's API to create summaries as the "input" and the full articles as the "output".
- **Revised Strategy:** I shifted focus from complete articles to teaching the model just the writing _style_. I did this by splitting the 50 articles into nearly 300 paragraphs, which significantly boosted my sample size.
- **Two-Step "Polishing" Method:** This new approach uses a two-step process. First, a powerful base AI model generates a standard, plain-text article from project info. Then, my Lora model "polishes" each paragraph into the desired style.
- **Data Preparation and Tuning:** I created training "inputs" by converting stylized paragraphs back to plain text, finding the DeepSeek model was best for this task. While training with LLAMA Factory, I discovered a Lora Rank of 64 yielded the best results.
- **Deployment & Final Fix:** I deployed the project on Hugging Face, but the initial results were poor because the base model I used for drafting (DeepSeek 1.5B) was too small. Using a larger, more capable base model for the initial draft solved the issue and produced a successful outcome.