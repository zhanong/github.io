---
title: Automated Blog Workflow
date: 2025-05-14
featureImage: img/20250514/cover.png
summary: An automated workflow from collecting sources, processing, to uploading to platform 
tags: Python, n8n, HTML, Cloud, Processing, Docker
---
I have a passion for automation, and a video about n8n inspired me to channel this obsession into a project.

The concept was to create a blog that delivered high-quality articles daily. I envisioned a beautifully formatted publication, not just an average newsletter, specifically for WeChat, one of the most popular blogging platforms. My goal was to automate as much of the workflow as possible.

While most of the process was straightforward to automate, I discovered that uploading articles to WeChat was a significant challenge.

To overcome this, I developed a final workflow composed of three main parts. To ensure seamless daily execution, I deployed the entire system to the cloud.

![](img/20250514/workflow.png)

### n8n

![](img/20250514/n8n.png)

To avoid the inconvenience of editing configurations directly on the cloud, I store all my content sources in a **Google Sheet**. My n8n workflow fetches this configuration and applies a series of filtering rules. The articles that pass these rules, which I call the "finalists," are then sent to **Gemini** for summarizing and calibration. This process generates a **Markdown** file containing the main content, along with two **JSON** files. The first JSON file configures the appearance of each summary within the article. The second saves the titles of the day's finalists to prevent them from being selected again the following day.

### Processing

Plain text alone isn't engaging enough. While AI can generate images, they often feel generic and lack a sense of deliberate design. I wanted to generate images in a more mathematical and unique way. Fortunately, I discovered a [blog post](https://sighack.com/post/getting-creative-with-perlin-noise-fields) that provided the foundation I needed. Building on this, I created a process that randomly generates organic or geometric patterns.

![An Animation from the Code](img/20250514/processing.gif)

### Python

The uploading process required special attention for two main reasons:

- WeChat's conversion from Markdown to its final article format is unreliable.
- WeChat does not support image hosting via hyperlinks; they must be uploaded directly.

Although several online "Markdown to WeChat" editors exist, their styling options did not meet my standards. Therefore, I decided to build a custom solution. I wrote a Python script to convert the Markdown file into an HTML file with my own customized styles. I then integrated this with the [markdown-to-wechat repository](https://github.com/chenyukang/markdown-to-wechat), modifying its hard-coded styling to allow for the application of my flexible style templates.



