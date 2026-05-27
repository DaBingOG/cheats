function showAboutInfo() {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('aboutDropdown');
    if (dropdown) dropdown.style.display = 'none';
    
    const existingModal = document.querySelector('.about-modal');
    if (existingModal) existingModal.remove();
    
    const aboutModal = document.createElement('div');
    aboutModal.className = 'about-modal';
    aboutModal.style.display = 'flex';
    aboutModal.innerHTML = `
        <div class="about-modal-overlay" onclick="hideAboutInfo()"></div>
        <div class="about-modal-content">
            <button class="about-modal-close" onclick="hideAboutInfo()">&#xd7;</button>
            <div class="about-icon">
                <svg class="icon icon-fill" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
            </div>
            <h3 class="about-title">信息反馈</h3>
            <div class="about-feedback">
                <p>如有问题请加QQ群咨询或反馈</p>
                <div class="feedback-qq-group">
                    <span class="qq-label">QQ群：</span>
                    <span class="qq-number">310630593</span>
                </div>
                <div class="feedback-qrcode">
                    <img src="images/UI/groupQR.jpg" class="qrcode-image" alt="QQ群二维码" />
                </div>
            </div>
            <p class="about-desc">本网站仅供学习交流使用</p>
        </div>
    `;
    document.body.appendChild(aboutModal);
}

function hideAboutInfo() {
    const aboutModal = document.querySelector('.about-modal');
    if (aboutModal) aboutModal.remove();
}

function showDonate() {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('aboutDropdown');
    if (dropdown) dropdown.style.display = 'none';
    
    const existingModal = document.querySelector('.donate-modal');
    if (existingModal) existingModal.remove();
    
    const donateModal = document.createElement('div');
    donateModal.className = 'donate-modal';
    donateModal.style.display = 'flex';
    donateModal.innerHTML = `
        <div class="donate-modal-overlay" onclick="hideDonate()"></div>
        <div class="donate-modal-content">
            <button class="donate-modal-close" onclick="hideDonate()">&#xd7;</button>
            <div class="donate-icon">
                <svg class="icon icon-fill" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
            </div>
            <h3 class="donate-title">捐赠支持</h3>
            <div class="donate-status">暂未开通</div>
            <p class="donate-desc">感谢您的支持与关注！</p>
        </div>
    `;
    document.body.appendChild(donateModal);
}

function hideDonate() {
    const donateModal = document.querySelector('.donate-modal');
    if (donateModal) donateModal.remove();
}

function toggleAboutDropdown() {
    const dropdown = document.getElementById('aboutDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('aboutDropdown');
    const navAbout = document.getElementById('navAbout');
    if (dropdown && navAbout && !navAbout.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});