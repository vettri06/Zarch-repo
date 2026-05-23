/* ========================================
   Zarch Repository — App Logic
   ======================================== */

(function () {
  'use strict';

  // ---- Package Data ----
  const packages = [
    {
      name: 'aylurs-gtk-shell-git',
      version: '3.1.2.r0.gbbee2f1-2',
      arch: 'x86_64',
      size: 4700922,
      file: 'aylurs-gtk-shell-git-3.1.2.r0.gbbee2f1-2-x86_64.pkg.tar.zst',
      desc: 'A customizable and extensible shell framework written in GTK'
    },
    {
      name: 'bun-bin',
      version: '1.3.11-1',
      arch: 'x86_64',
      size: 35403553,
      file: 'bun-bin-1.3.11-1-x86_64.pkg.tar.zst',
      desc: 'All-in-one JavaScript runtime, bundler, transpiler, and package manager'
    },
    {
      name: 'calamares',
      version: '3.4.0-1',
      arch: 'x86_64',
      size: 4619492,
      file: 'calamares-3.4.0-1-x86_64.pkg.tar.zst',
      desc: 'Distribution-independent installer framework'
    },
    {
      name: 'libastal-4-git',
      version: 'r865.6e49ec9-1',
      arch: 'x86_64',
      size: 53470,
      file: 'libastal-4-git-r865.6e49ec9-1-x86_64.pkg.tar.zst',
      desc: 'Astal library for GTK4 — latest git revision'
    },
    {
      name: 'libastal-git',
      version: 'r865.6e49ec9-1',
      arch: 'x86_64',
      size: 90240,
      file: 'libastal-git-r865.6e49ec9-1-x86_64.pkg.tar.zst',
      desc: 'Astal core library — latest git revision'
    },
    {
      name: 'libastal-io-git',
      version: 'r865.6e49ec9-1',
      arch: 'x86_64',
      size: 75363,
      file: 'libastal-io-git-r865.6e49ec9-1-x86_64.pkg.tar.zst',
      desc: 'Astal I/O library — latest git revision'
    },
    {
      name: 'linux-api-headers',
      version: '6.19-1',
      arch: 'x86_64',
      size: 1561102,
      file: 'linux-api-headers-6.19-1-x86_64.pkg.tar.zst',
      desc: 'Kernel headers sanitized for use in userspace'
    },
    {
      name: 'mkinitcpio',
      version: '40-4',
      arch: 'any',
      size: 68823,
      file: 'mkinitcpio-40-4-any.pkg.tar.zst',
      desc: 'Modular initramfs image creation utility'
    },
    {
      name: 'mkinitcpio-archiso',
      version: '73-1',
      arch: 'any',
      size: 17535,
      file: 'mkinitcpio-archiso-73-1-any.pkg.tar.zst',
      desc: 'Mkinitcpio hooks for archiso'
    },
    {
      name: 'mkinitcpio-busybox',
      version: '1.36.1-1',
      arch: 'x86_64',
      size: 284169,
      file: 'mkinitcpio-busybox-1.36.1-1-x86_64.pkg.tar.zst',
      desc: 'Base initramfs tools (busybox) for mkinitcpio'
    },
    {
      name: 'mkinitcpio-nfs-utils',
      version: '0.3-8',
      arch: 'x86_64',
      size: 19775,
      file: 'mkinitcpio-nfs-utils-0.3-8-x86_64.pkg.tar.zst',
      desc: 'NFS utilities for mkinitcpio'
    }
  ];

  // ---- Helpers ----
  function formatSize(bytes) {
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return bytes + ' B';
  }

  function escapeHtml(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
  }

  // ---- SVG Icons (inline) ----
  const icons = {
    package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16.5 9.4-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>',
    hardDrive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    searchX: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="8" x2="14" y2="14"/><line x1="14" y1="8" x2="8" y2="14"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  };

  // ---- Get base URL for package downloads ----
  function getBaseUrl() {
    return window.location.origin + window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  }

  // ---- Render Package Cards ----
  function renderPackages(list) {
    const grid = document.getElementById('package-grid');
    const countEl = document.getElementById('search-count');

    if (!grid) return;

    if (countEl) {
      countEl.textContent = list.length + ' package' + (list.length !== 1 ? 's' : '');
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
          ${icons.searchX}
          <h3>No packages found</h3>
          <p>Try adjusting your search query or filters</p>
        </div>`;
      return;
    }

    const base = getBaseUrl();
    grid.innerHTML = list.map((pkg, i) => `
      <div class="package-card animate-in" style="animation-delay: ${Math.min(i * 50, 400)}ms">
        <div class="package-card-inner">
          <div class="package-name">
            <span class="pkg-icon">${icons.package}</span>
            ${escapeHtml(pkg.name)}
          </div>
          <span class="package-version">${escapeHtml(pkg.version)}</span>
          <div class="package-meta">
            <span class="package-meta-item">
              ${icons.cpu}
              <span class="arch-badge">${escapeHtml(pkg.arch)}</span>
            </span>
            <span class="package-meta-item">
              ${icons.hardDrive}
              <span class="size-badge">${formatSize(pkg.size)}</span>
            </span>
          </div>
          <p style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">${escapeHtml(pkg.desc)}</p>
          <a href="${base}/${encodeURIComponent(pkg.file)}" class="package-download" download>
            ${icons.download}
            Download .pkg.tar.zst
          </a>
        </div>
      </div>
    `).join('');
  }

  // ---- Search ----
  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    let debounce;
    input.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const q = input.value.trim().toLowerCase();
        const activeArch = getActiveFilter();
        const filtered = packages.filter(pkg => {
          const matchText = !q ||
            pkg.name.toLowerCase().includes(q) ||
            pkg.version.toLowerCase().includes(q) ||
            pkg.desc.toLowerCase().includes(q);
          const matchArch = activeArch === 'all' || pkg.arch === activeArch;
          return matchText && matchArch;
        });
        renderPackages(filtered);
      }, 150);
    });
  }

  // ---- Filters ----
  function getActiveFilter() {
    const active = document.querySelector('.filter-chip.active');
    return active ? active.dataset.arch : 'all';
  }

  function initFilters() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', function () {
        chips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        // Re-trigger search
        const input = document.getElementById('search-input');
        if (input) input.dispatchEvent(new Event('input'));
      });
    });
  }

  // ---- Copy Config ----
  function initCopy() {
    const btn = document.getElementById('btn-copy-config');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const base = getBaseUrl();
      const config = `[zarch-repo]\nSigLevel = Optional TrustAll\nServer = ${base}`;
      navigator.clipboard.writeText(config).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = icons.check + ' Copied!';
        showToast('Configuration copied to clipboard');
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = icons.copy + ' Copy';
        }, 2500);
      }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = config;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.classList.add('copied');
        btn.innerHTML = icons.check + ' Copied!';
        showToast('Configuration copied to clipboard');
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = icons.copy + ' Copy';
        }, 2500);
      });
    });
  }

  // ---- Toast ----
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ---- Background Glow Follow Mouse ----
  function initGlow() {
    document.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });
  }

  // ---- Pacman Config Display ----
  function initConfigDisplay() {
    const pre = document.getElementById('config-code');
    if (!pre) return;
    const base = getBaseUrl();
    pre.innerHTML =
      '<span class="comment"># Add this to /etc/pacman.conf</span>\n' +
      '<span class="bracket">[zarch-repo]</span>\n' +
      '<span class="key">SigLevel</span> = <span class="value">Optional TrustAll</span>\n' +
      '<span class="key">Server</span> = <span class="value">' + escapeHtml(base) + '</span>';
  }

  // ---- Update Stats ----
  function initStats() {
    const pkgCount = document.getElementById('stat-packages');
    const totalSize = document.getElementById('stat-size');
    const archCount = document.getElementById('stat-archs');

    if (pkgCount) pkgCount.textContent = packages.length;

    if (totalSize) {
      const total = packages.reduce((s, p) => s + p.size, 0);
      totalSize.textContent = formatSize(total);
    }

    if (archCount) {
      const archs = new Set(packages.map(p => p.arch));
      archCount.textContent = archs.size;
    }
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', () => {
    initGlow();
    initStats();
    initConfigDisplay();
    initCopy();
    initSearch();
    initFilters();
    renderPackages(packages);
  });

})();
