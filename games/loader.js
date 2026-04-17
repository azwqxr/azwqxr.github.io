(() => {
  // =========================
  // STATE
  // =========================
  let typingDone = false;
  let pageLoaded = false;

  let audioCtx = null;
  let loopTimer = null;

  let isMuted = localStorage.getItem("musicMuted") === "true";
  let isPlaying = false;
  let shouldResumeMusic = false;

  let gameActive = false;

  // =========================
  // AUDIO ENGINE (FIXED)
  // =========================
  function playNote(ctx, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.value = 0.08;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }

  function startMusic() {
    if (isMuted || isPlaying) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    const melody = [
      392, 440, 523, 440,
      392, 330, 349, 392,
      440, 523, 659, 523,
      440, 392, 330, 392
    ];

    let i = 0;
    isPlaying = true;

    function loop() {
      if (isMuted || !isPlaying) return;

      playNote(audioCtx, melody[i]);
      i = (i + 1) % melody.length;

      loopTimer = setTimeout(loop, 300);
    }

    loop();
  }

  function stopMusic() {
    shouldResumeMusic = true;
    isPlaying = false;

    if (loopTimer) {
      clearTimeout(loopTimer);
      loopTimer = null;
    }

    if (audioCtx) {
      try {
        audioCtx.close();
      } catch (e) {}
      audioCtx = null;
    }
  }

  function resumeMusic() {
    if (shouldResumeMusic && !isMuted && !gameActive) {
      shouldResumeMusic = false;
      startMusic();
    }
  }

  window.stopMusic = stopMusic;
  window.resumeMusic = resumeMusic;

  // =========================
  // MUTE BUTTON
  // =========================
  function createMuteButton() {
    if (document.getElementById("music-toggle")) return;

    const btn = document.createElement("button");
    btn.id = "music-toggle";
    btn.textContent = isMuted ? "🔇" : "🔊";

    Object.assign(btn.style, {
      position: "fixed",
      bottom: "15px",
      right: "15px",
      zIndex: "999999",
      background: "#111",
      color: "#fff",
      border: "none",
      padding: "10px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px"
    });

    btn.onclick = () => {
      isMuted = !isMuted;
      localStorage.setItem("musicMuted", isMuted);

      btn.textContent = isMuted ? "🔇" : "🔊";

      if (isMuted) {
        stopMusic();
      } else {
        startMusic();
      }
    };

    document.body.appendChild(btn);
  }

  // =========================
  // GAME IFRAME AUTO DETECT
  // =========================
  function setupGameWatcher() {
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector("iframe");

      const active =
        iframe &&
        iframe.offsetParent !== null &&
        iframe.style.display !== "none";

      if (active && !gameActive) {
        gameActive = true;
        stopMusic();
      }

      if (!active && gameActive) {
        gameActive = false;
        resumeMusic();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // =========================
  // LOADER UI
  // =========================
  const style = document.createElement("style");
  style.textContent = `
    #global-loader {
      position: fixed;
      inset: 0;
      background: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;
      transition: opacity 0.4s ease;
    }

    #global-loader.hidden {
      opacity: 0;
      pointer-events: none;
    }

    #global-loader .loader-container {
      width: 240px;
    }

    .terminal_toolbar {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 8px;
      background: linear-gradient(#504b45, #3c3b37);
      border-radius: 6px 6px 0 0;
    }

    .butt { display: flex; }

    .btn {
      width: 12px;
      height: 12px;
      margin-right: 5px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(#7d7871, #595953);
    }

    .btn-color { background: #ee411a; }

    .user {
      color: #d5d0ce;
      margin-left: 6px;
      font-size: 13px;
    }

    .terminal_body {
      background: rgba(56, 4, 40, 0.92);
      padding: 10px;
      border-radius: 0 0 6px 6px;
      font-size: 12px;
      font-family: monospace;
    }

    .terminal_line {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .terminal_user { color: #7eda28; }
    .terminal_location { color: #4878c0; }
    .terminal_bling { color: #ddd; }

    #cmd { color: #fff; }

    .terminal_cursor {
      width: 6px;
      height: 14px;
      background: white;
      display: inline-block;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }

    .terminal_response {
      display: none;
      margin-top: 6px;
      color: #9ca3af;
    }
  `;
  document.head.appendChild(style);

  const loader = document.createElement("div");
  loader.id = "global-loader";

  loader.innerHTML = `
    <div class="loader-container">
      <div class="terminal_toolbar">
        <div class="butt">
          <button class="btn btn-color"></button>
          <button class="btn"></button>
          <button class="btn"></button>
        </div>
        <p class="user">johndoe@admin: ~</p>
      </div>

      <div class="terminal_body">
        <div class="terminal_line">
          <span class="terminal_user">johndoe@admin:</span>
          <span class="terminal_location">~</span>
          <span class="terminal_bling">$</span>
          <span id="cmd"></span>
          <span class="terminal_cursor"></span>
        </div>

        <div id="response" class="terminal_response">Loading...</div>
      </div>
    </div>
  `;

  // =========================
  // LOADER LOGIC
  // =========================
  function tryUnlock() {
    if (typingDone && pageLoaded) {
      setTimeout(() => {
        loader.classList.add("hidden");

        setTimeout(() => {
          loader.remove();
          createMuteButton();
          startMusic();
          setupGameWatcher();
        }, 400);

      }, 600);
    }
  }

  function startTyping() {
    const text = "initialize/mainsite.html";
    const cmd = loader.querySelector("#cmd");
    const response = loader.querySelector("#response");

    let i = 0;

    function type() {
      if (i < text.length) {
        cmd.textContent += text[i++];
        setTimeout(type, 45);
      } else {
        response.style.display = "block";
        typingDone = true;
        tryUnlock();
      }
    }

    setTimeout(type, 300);
  }

  function init() {
    document.body.appendChild(loader);
    startTyping();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", () => {
    pageLoaded = true;
    tryUnlock();
  });

})();
