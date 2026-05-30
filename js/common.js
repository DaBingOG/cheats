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

// 回到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 刷新页面
function refreshPage() {
    window.location.reload();
}

// 黑夜模式切换
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// 初始化黑夜模式
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
}

// 页面加载时初始化深色模式
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
});

// 添加悬浮按钮
function addFloatButtons() {
    const floatButtons = `
        <!-- 悬浮按钮 -->
        <button class="float-btn dark-btn" onclick="toggleDarkMode()" title="切换黑夜模式">
            <svg class="icon sun-icon" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 37C31.1797 37 37 31.1797 37 24C37 16.8203 31.1797 11 24 11C16.8203 11 11 16.8203 11 24C11 31.1797 16.8203 37 24 37Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><circle cx="24" cy="4" r="2" fill="currentColor"/><circle cx="39" cy="10" r="2" fill="currentColor"/><circle cx="45" cy="24" r="2" fill="currentColor"/><circle cx="39" cy="38" r="2" fill="currentColor"/><circle cx="24" cy="44" r="2" fill="currentColor"/><circle cx="9" cy="38" r="2" fill="currentColor"/><circle cx="3" cy="24" r="2" fill="currentColor"/><circle cx="9" cy="10" r="2" fill="currentColor"/></svg>
            <svg class="icon moon-icon" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.0527 4.41085C22.5828 5.83695 18.5455 10.8106 18.5455 16.7273C18.5455 23.7564 24.2436 29.4545 31.2727 29.4545C37.1894 29.4545 42.1631 25.4172 43.5891 19.9473C43.8585 21.256 44 22.6115 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C25.3885 4 26.744 4.14149 28.0527 4.41085Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>
        </button>
        <button class="float-btn refresh-btn" onclick="refreshPage()" title="刷新页面">
            <svg class="icon icon-stroke" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17"/><path d="M42 8V17H33"/></svg>
        </button>
        <button class="float-btn top-btn" onclick="scrollToTop()" title="回到顶部">
            <svg class="icon icon-stroke" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 30L25 18L37 30"/></svg>
        </button>
    `;
    document.body.insertAdjacentHTML('beforeend', floatButtons);
}

// 页面加载完成后添加悬浮按钮
document.addEventListener('DOMContentLoaded', function() {
    addFloatButtons();
});