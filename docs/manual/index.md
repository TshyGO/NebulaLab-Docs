---
layout: page
---

<style>
/* Page-specific hero and layout styles */
.manual-hero {
  text-align: center;
  padding: 50px 30px;
  background: linear-gradient(135deg, rgba(224, 120, 64, 0.08) 0%, rgba(56, 189, 248, 0.05) 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.dark .manual-hero {
  background: linear-gradient(135deg, rgba(224, 120, 64, 0.15) 0%, rgba(13, 21, 32, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.manual-hero h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.25;
  padding-bottom: 8px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #0f172a 30%, #e07840 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1.5px;
}

.dark .manual-hero h1 {
  background: linear-gradient(135deg, #f8fafc 40%, #f08840 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.manual-hero .nl-lead {
  font-size: 1.2rem;
  color: #475569;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.dark .manual-hero .nl-lead {
  color: #94a3b8;
}

.section-title {
  font-size: 1.9rem !important;
  font-weight: 700 !important;
  margin-top: 48px !important;
  margin-bottom: 20px !important;
  border-bottom: none !important;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #0f172a !important;
}

.dark .section-title {
  color: #f8fafc !important;
}

.section-title::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 26px;
  background: linear-gradient(180deg, #f08840 0%, #e07840 100%);
  border-radius: 99px;
}

.manual-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.manual-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 28px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.dark .manual-card {
  background: #151d30;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.manual-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #e07840 0%, #f08840 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.manual-card:hover {
  transform: translateY(-8px);
  border-color: #e07840;
  box-shadow: 0 12px 30px rgba(224, 120, 64, 0.15);
}

.dark .manual-card:hover {
  border-color: #f08840;
  box-shadow: 0 12px 30px rgba(224, 120, 64, 0.25);
}

.manual-card:hover::before {
  opacity: 1;
}

.manual-card-icon {
  width: 46px;
  height: 46px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.bg-orange { background: rgba(224, 120, 64, 0.08); color: #d96a2b; }
.bg-blue { background: rgba(56, 189, 248, 0.08); color: #0284c7; }
.bg-green { background: rgba(34, 197, 94, 0.08); color: #16a34a; }
.bg-violet { background: rgba(168, 85, 247, 0.08); color: #7c3aed; }
.bg-amber { background: rgba(245, 158, 11, 0.08); color: #b45309; }
.bg-pink { background: rgba(244, 63, 94, 0.08); color: #be123c; }

.dark .bg-orange { background: rgba(224, 120, 64, 0.15); color: #f08840; }
.dark .bg-blue { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
.dark .bg-green { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
.dark .bg-violet { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
.dark .bg-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.dark .bg-pink { background: rgba(244, 63, 94, 0.15); color: #fb7185; }

.manual-card-icon svg {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2.5;
  fill: none;
}

.manual-card h3 {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  margin: 0 0 12px !important;
  color: #0f172a;
}

.dark .manual-card h3 {
  color: #f8fafc;
}

.manual-card p {
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.dark .manual-card p {
  color: #94a3b8;
}

.download-block {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 40px;
  margin-top: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}

.dark .download-block {
  background: #151d30;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.download-block p {
  color: #334155;
  line-height: 1.7;
  font-size: 1.05rem;
}

.dark .download-block p {
  color: #94a3b8;
}

.download-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 28px 0;
}

.btn-dl {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.05rem;
  text-decoration: none !important;
  transition: all 0.25s ease;
  cursor: pointer;
}

.btn-dl-primary {
  background: linear-gradient(135deg, #f08840 0%, #e07840 100%);
  color: #fff !important;
  box-shadow: 0 4px 14px rgba(224, 120, 64, 0.35);
}

.btn-dl-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(224, 120, 64, 0.5);
}

.btn-dl-secondary {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155 !important;
}

.dark .btn-dl-secondary {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: #f8fafc !important;
}

.btn-dl-secondary:hover {
  transform: translateY(-3px);
  background: #e2e8f0;
}

.dark .btn-dl-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.bypass-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .bypass-grid { grid-template-columns: 1fr; }
}

.bypass-card {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 24px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.02);
}

.dark .bypass-card {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.15);
}

.bypass-card h4 {
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  margin: 0 0 16px !important;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #0f172a;
}

.dark .bypass-card h4 {
  color: #f8fafc;
}

.bypass-card ol {
  margin: 0 !important;
  padding-left: 20px !important;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.7;
}

.dark .bypass-card ol {
  color: #94a3b8;
}

.roadmap-badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: 4px;
  background: rgba(224, 120, 64, 0.08);
  color: #e07840;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.dark .roadmap-badge {
  background: rgba(224, 120, 64, 0.15);
  color: #f08840;
}

.manual-card p,
.download-block p,
.bypass-card ol,
.bypass-card ul,
.manual-hero .nl-lead {
  font-size: 1.05rem !important;
  line-height: 1.7 !important;
}
</style>

<!-- Hero Section -->
<div class="manual-hero">
  <h1>入门指南</h1>
  <p class="nl-lead">欢迎使用 <strong>NebulaLab</strong>！这是一款专为科研人员打造的桌面实验数据处理与分析工作台。本指南将引导您了解软件的核心功能、独特优势、获取渠道及后续演进方向。</p>
</div>

<!-- Section 1 -->
<h2 class="section-title" id="一-软件能做什么工作">一、软件能做什么工作</h2>
<p style="color: var(--text-secondary);">NebulaLab旨在缩短从原始实验仪器数据到学术报告/论文出版插图之间的路径。它主要承担以下核心工作：</p>

<div class="manual-grid">
  <article class="manual-card">
    <div class="manual-card-icon bg-orange">
      <svg viewBox="0 0 24 24"><path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M12 3v11m-5-5 5 5 5-5M6 4h12"></path></svg>
    </div>
    <h3>数据导入与整理</h3>
    <p>一键拖拽导入CSV、TXT、Excel、DAT、XY、ASC等十余种常规仪器数据。支持多Sheet解析与"分组树"样品组织。</p>
  </article>

  <article class="manual-card">
    <div class="manual-card-icon bg-blue">
      <svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="12" cy="18" r="3"></circle><path d="M8.6 7.6 11 10a3.4 3.4 0 0 1 1 2.4V15M15.4 7.6 13 10a3.4 3.4 0 0 0-1 2.4V15"></path></svg>
    </div>
    <h3>一站式数据预处理</h3>
    <p>提供直观的单元格双击编辑，内置数据裁剪、平滑降噪（如SG滤波器）、基线扣除与归一化等高频算法，秒级过滤噪声。</p>
  </article>

  <article class="manual-card">
    <div class="manual-card-icon bg-green">
      <svg viewBox="0 0 24 24"><path d="M4 19V5a2 2 0 0 1 2-2h7M14 3h6v6m-9 3 9-9M7 15h3l2-3 3 4 2-2"></path></svg>
    </div>
    <h3>科学绘图与无损导出</h3>
    <p>支持多曲线同屏对比，高自由度调整曲线粗细、图例、网格和坐标轴。一键导出论文级的无损SVG矢量图或高清晰PNG。</p>
  </article>
</div>

<!-- Section 2: Our advantages -->
<h2 class="section-title" id="二-我们有什么优势">二、我们的优势</h2>
<p style="color: var(--text-secondary);">为什么数万科研学者选择使用NebulaLab？因为它在以下维度带来了革命性的体验升华：</p>

<div class="manual-grid">
  <article class="manual-card">
    <div class="manual-card-icon bg-orange">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
    </div>
    <h3>1. 批量多文件极速载入</h3>
    <p>我们可以一次性导入多组同类型的实验数据文件（无论是通过文件夹选择还是一次性拖入）。这完美避免了画图时一遍一遍重复机械操作，效率提升数十倍！</p>
  </article>

  <article class="manual-card">
    <div class="manual-card-icon bg-blue">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
    </div>
    <h3>2. 算法工作流模板化复用</h3>
    <p>我们可以把你同一类型的处理步骤（如平滑、归一化、去基线）一键存为专属配置模板。下次再处理相同类型的数据时，直接调用上次的模板，也就是说一种类型的数据处理工作只用做一次！</p>
  </article>

  <article class="manual-card">
    <div class="manual-card-icon bg-green">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
    </div>
    <h3>3. 共享出图云社区</h3>
    <p>我自己不会调参数或没有模板怎么办？我们在社区模块里提供大量其他科研人已经上传并共享好的优秀模板，找找有没有你需要的吧，下载即可一键出图！</p>
  </article>
</div>

<!-- Section 3 -->
<h2 class="section-title" id="三-在哪里下载与安全放行">三、在哪里下载与安全放行</h2>
<div class="download-block">
  <p>为了保障软件的纯粹性与开源的完整性，开发团队目前未向商业机构购买昂贵的高级代码签名证书。<strong>请放心，本软件完全开源且绝对安全。</strong> 请务必通过以下官方Releases渠道获取最新版本安装包：</p>
  
  <div class="download-actions">
    <a href="https://github.com/TshyGO/NebulaLab-Releases/releases/latest" target="_blank" rel="noreferrer" class="btn-dl btn-dl-primary">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:middle; margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/></svg>
      获取最新稳定版 (.zip / .exe)
    </a>
    <a href="https://github.com/TshyGO/NebulaLab-Releases" target="_blank" rel="noreferrer" class="btn-dl btn-dl-secondary">
      浏览开源仓库
    </a>
  </div>

  <div class="bypass-grid">
    <div class="bypass-card">
      <h4>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
        1. 浏览器下载拦截解除
      </h4>
      <ol>
        <li><strong>Edge浏览器</strong>：若提示"无法安全下载"，鼠标悬停于该项，点击右侧的 <strong>"..." (显示更多操作)</strong> -> 选择 <strong>"保留"</strong> -> 点击 <strong>"显示详细信息"</strong> -> 点击 <strong>"仍然保留"</strong>。</li>
        <li><strong>Chrome浏览器</strong>：若下载被阻止，点击下载项右侧的 <strong>"保留"</strong> -> 并在弹出的二次确认中选择 <strong>"保留危险文件"</strong> 完成下载。</li>
      </ol>
    </div>
    
    <div class="bypass-card">
      <h4>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        2. 首次运行系统拦截解除
      </h4>
      <ol>
        <li>首次在Windows中双击打开安装包或运行解压后的 <code>NebulaLab.exe</code> 时，系统可能会弹出蓝色警告窗口提示"Windows已保护您的电脑"。</li>
        <li>点击窗口文本正中部的 <strong>"更多信息"</strong> 链接。</li>
        <li>窗口右下方会显现出隐藏的 <strong>"仍要运行"</strong> 按钮，点击 <strong>"仍要运行"</strong> 即可正常启动。</li>
      </ol>
    </div>
  </div>
</div>

<!-- Section 4 -->
<h2 class="section-title" id="四-后续更新与改动方向">四、后续更新与改动方向</h2>
<p style="color: var(--text-secondary);">NebulaLab仍处于高速迭代与演进中，在未来的版本中，我们将围绕以下四个核心方向进行重大改动与升级：</p>

<div class="manual-grid">
  <article class="manual-card">
    <span class="roadmap-badge">配方模块</span>
    <h3>配方辅助计算</h3>
    <p>引入摩尔质量、克分子比、稀释比及多组分反应浓度配置自动计算器，大幅提高实验前期制备的配比效率。</p>
  </article>

  <article class="manual-card">
    <span class="roadmap-badge">记录归档</span>
    <h3>实验记录本（ELN）</h3>
    <p>支持将实验条件、环境参数、当天的文字操作记录与导入的原始数据/处理流程进行结构化绑定，方便检索。</p>
  </article>

  <article class="manual-card">
    <span class="roadmap-badge">高级算法</span>
    <h3>高阶峰型拟合</h3>
    <p>引入更丰富的峰型数值拟合算法（如Gauss/Lorentz/Voigt多峰拟合），并提供智能学术谱图库对比检索功能。</p>
  </article>

  <article class="manual-card" style="border-color: rgba(245, 158, 11, 0.15); box-shadow: 0 4px 12px rgba(245, 158, 11, 0.02);">
    <span class="roadmap-badge" style="background: rgba(245, 158, 11, 0.08); color: #b45309;">局域网部署</span>
    <h3>自托管许可证服务器部署</h3>
    <p>针对高保密、无法连接公网的重点实验室，我们将支持完全私有化的局域网自托管授权服务器部署方案。未来只需通过本地环境变量<code>NEBULA_SELF_HOSTED_URL</code>与公钥<code>NEBULA_SELF_HOSTED_PUBLIC_KEY</code>配置，即可离线在本地安全沙盒中使用Ed25519公钥签名校验设备硬件指纹，提供无缝、绝对隐私的单机尊享体验。</p>
  </article>
</div>