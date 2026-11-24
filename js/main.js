/* ============================================================
   我的成长主页 · 共享脚本
   功能：导航高亮 / 移动端菜单 / 回到顶部 / 留言表单校验与保存
   （无任何框架与外部依赖，纯原生 JavaScript）
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. 当前页面的导航链接高亮 ---------- */
  var navLinks = document.querySelectorAll('#navLinks a');
  var currentPath = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(function (link) {
    var linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  /* ---------- 2. 移动端汉堡菜单开关 ---------- */
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navLinks');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
    // 点击任意菜单项后自动收起菜单
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('open');
      });
    });
  }

  /* ---------- 3. 回到顶部按钮：滚动超过一屏才出现 ---------- */
  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('show', window.scrollY > window.innerHeight * 0.6);
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 4. 页脚年份自动更新 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- 5. 留言表单：校验 + localStorage 保存 ---------- */
  var form = document.getElementById('messageForm');
  if (form) {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var messageInput = document.getElementById('message');
    var successTip = document.getElementById('formSuccess');
    var STORAGE_KEY = 'growth_home_messages';

    // 简单的邮箱格式校验
    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    // 显示某个输入框的错误
    function showError(input, errorEl, msg) {
      input.classList.add('invalid');
      errorEl.textContent = msg;
    }

    // 清除某个输入框的错误
    function clearError(input, errorEl) {
      input.classList.remove('invalid');
      errorEl.textContent = '';
    }

    // 保存留言到 localStorage
    function saveMessage(msg) {
      var list = [];
      try {
        list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch (e) { /* 数据损坏时忽略，从空列表开始 */ }
      list.push(msg);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // 渲染历史留言
    function renderMessages() {
      var listEl = document.getElementById('messageListInner');
      if (!listEl) return;
      var list = [];
      try {
        list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch (e) { list = []; }
      listEl.innerHTML = '';
      if (list.length === 0) {
        listEl.innerHTML = '<li class="empty-tip">还没有留言，来做第一个吧 👋</li>';
        return;
      }
      list.slice().reverse().forEach(function (msg) {
        var li = document.createElement('li');
        var meta = document.createElement('p');
        meta.className = 'msg-meta';
        meta.textContent = msg.name + ' · ' + msg.time;
        var body = document.createElement('p');
        body.textContent = msg.message;
        li.appendChild(meta);
        li.appendChild(body);
        listEl.appendChild(li);
      });
    }

    // 提交留言前先校验
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // 阻止表单默认提交（纯前端演示）
      clearError(nameInput, document.getElementById('nameError'));
      clearError(emailInput, document.getElementById('emailError'));
      clearError(messageInput, document.getElementById('messageError'));

      var ok = true;
      if (!nameInput.value.trim()) {
        showError(nameInput, document.getElementById('nameError'), '请填写称呼');
        ok = false;
      }
      if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, document.getElementById('emailError'), '邮箱格式不正确');
        ok = false;
      }
      if (messageInput.value.trim().length < 5) {
        showError(messageInput, document.getElementById('messageError'), '留言至少写 5 个字');
        ok = false;
      }
      if (!ok) return;

      saveMessage({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        time: new Date().toLocaleString()
      });
      form.reset();
      renderMessages();
      successTip.classList.add('show');
      setTimeout(function () { successTip.classList.remove('show'); }, 4000);
    });

    // 清空本地留言
    var clearBtn = document.getElementById('clearMessages');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        localStorage.removeItem(STORAGE_KEY);
        renderMessages();
      });
    }

    renderMessages();
  }
});
