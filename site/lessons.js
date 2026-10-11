// LazyVim Dojo — curriculum.
// Step types:
//   {t:"say",  html}                         explanation
//   {t:"keys", keys, say, see, src?}         type the keys in the browser (muscle memory)
//   {t:"nvim", html}                         do it for real in nvim (tick when done)
// src: where the mapping lives — "global" | "neotree" | "lsp" | "term" (checked against
// your live keymap dump) or "vim" | "picker" | "lazygit" | "trouble" | "inside" (not in the dump).
window.LESSONS = [
{
  id: "orient", title: "Orientation", blurb: "The screen, the leader key, and how to never get lost.",
  steps: [
    { t: "say", html: `
      <p>Start every session from a terminal with:</p>
      <pre>./practice      # from the lazyvim-dojo folder</pre>
      <p>That opens your real nvim on a small Lua project called <b>callsheet</b>, starting in its README. (Plain <code>nvim</code> with no file shows the LazyVim dashboard instead. Press <kbd>Space</kbd><kbd>Space</kbd> or <kbd>f</kbd> there to open a file.) It has a few deliberate problems for later lessons: an unused variable, a missing field and some uncommitted git changes. To put it back to the starting state, run <code>./practice --reset</code>.</p>
      <div class="screen">
        <div class="z bl">bufferline: open <b>buffers</b>, not tabs</div>
        <div class="z tree">neo-tree<br><small>explorer</small></div>
        <div class="z ed">editor window<br><small>sign column on the left: git + diagnostics</small></div>
        <div class="z ll">lualine: mode · branch · diagnostics · file · position</div>
      </div>
      <p>There's one idea to hold on to: <b>LazyVim is Vim with a menu on the Space key.</b> Almost everything new you'll learn starts with <kbd>Space</kbd>, which is called <i>leader</i>.</p>` },
    { t: "keys", keys: "<leader>", src: "vim", say: "Press the leader key and stop", see: "Wait half a second and which-key pops up at the bottom: the menu of everything under Space. Groups (b buffer, c code, f file, g git, s search, u ui, w windows, x diagnostics…) are submenus. <kbd>Esc</kbd> closes it; <kbd>Backspace</kbd> goes up a level." },
    { t: "nvim", html: `In nvim, press <kbd>Space</kbd>, read the menu, then press <kbd>f</kbd> and read the <b>file</b> submenu. Press <kbd>Backspace</kbd> to go back, then <kbd>Esc</kbd>. <b>If you forget a key, press Space and browse.</b>` },
    { t: "keys", keys: "<leader>sk", src: "global", say: "Search every keymap", see: "A fuzzy picker listing every mapping. Type “neo” or “split” to find things. When you're stuck, this is the place to look." },
    { t: "keys", keys: "<leader>?", src: "global", say: "Show keymaps that only apply in this buffer", see: "which-key shows only the mappings local to the current buffer. Handy inside neo-tree, where most keys are local." },
    { t: "say", html: `<p><b>Panic button:</b> <kbd>Esc</kbd> closes popups, pickers and which-key, and clears the search highlight. If you're stuck in a weird window, <kbd>Esc</kbd> then <kbd>q</kbd> gets you out of nearly anything.</p>
      <p>The dashboard you see on launch also has single-letter shortcuts: <kbd>f</kbd> find file, <kbd>r</kbd> recent, <kbd>g</kbd> grep, <kbd>s</kbd> restore session, <kbd>q</kbd> quit.</p>` },
    { t: "keys", keys: "<leader>qq", src: "global", say: "Quit everything", see: "Quits nvim and asks before throwing away unsaved buffers." },
  ]
},
{
  id: "neotree", title: "Neo-tree: the file explorer", blurb: "Open it, move around, create, rename and delete files.",
  steps: [
    { t: "keys", keys: "<leader>e", src: "global", say: "Toggle the explorer (project root)", see: "Neo-tree slides in on the left with focus in it. Press it again to close. <kbd>Space</kbd><kbd>E</kbd> opens it at the current working directory instead." },
    { t: "say", html: `<p>Inside the tree you're in <b>normal mode</b>, so <kbd>j</kbd>/<kbd>k</kbd>, <kbd>gg</kbd>/<kbd>G</kbd> and <kbd>/</kbd> all behave as you'd expect. LazyVim adds vim-ish open and close keys:</p>` },
    { t: "keys", keys: "l", src: "neotree", say: "In the tree: open the file, or expand the folder", see: "Folders expand; files open in the window you were last in. <kbd>Enter</kbd> does the same." },
    { t: "keys", keys: "h", src: "neotree", say: "In the tree: collapse the folder", see: "Collapses the folder, or jumps to the parent folder if you're on a file." },
    { t: "nvim", html: `Open the tree, expand <code>notes/</code> and open <code>todo.md</code>. Then press <kbd>Space</kbd><kbd>e</kbd> again to close the tree.` },
    { t: "say", html: `<p><b>Moving between the tree and your file</b> isn't a tree command, it's window movement (next lesson). <kbd>Ctrl</kbd><kbd>h</kbd> moves into the window on the left (the tree) and <kbd>Ctrl</kbd><kbd>l</kbd> moves into the window on the right (the file). That's the main thing to make habit.</p>` },
    { t: "keys", keys: "<C-h>", src: "global", say: "Go to the window on the left", see: "Focus jumps into neo-tree when it's open." },
    { t: "keys", keys: "<C-l>", src: "global", say: "Go to the window on the right", see: "Focus jumps back into your file." },
    { t: "say", html: `<p><b>File operations.</b> Put the cursor on a folder (or a file inside it), then:</p>` },
    { t: "keys", keys: "a", src: "neotree", say: "In the tree: add a file. End the name with / to make a folder", see: "A popup asks for the name. <code>locations.md</code> makes a file; <code>scouting/</code> makes a folder; <code>scouting/day1.md</code> makes both." },
    { t: "keys", keys: "r", src: "neotree", say: "In the tree: rename", see: "Popup pre-filled with the current name." },
    { t: "keys", keys: "d", src: "neotree", say: "In the tree: delete (asks y/n)", see: "A confirm popup appears. Type y and press Enter." },
    { t: "keys", keys: "c", src: "neotree", say: "In the tree: copy to a new path", see: "Asks for the destination path. <kbd>m</kbd> moves the file the same way." },
    { t: "nvim", html: `In <code>notes/</code>, press <kbd>a</kbd> and create <code>locations.md</code>. Rename it to <code>scouting.md</code> with <kbd>r</kbd>, then delete it with <kbd>d</kbd>.` },
    { t: "keys", keys: "H", src: "neotree", say: "In the tree: show/hide dotfiles and git-ignored files", see: "<code>.env</code>, <code>.gitignore</code> and <code>.luarc.json</code> appear, dimmed." },
    { t: "keys", keys: "P", src: "neotree", say: "In the tree: preview without opening", see: "Shows a floating preview of the file under the cursor. Press P again to close it." },
    { t: "keys", keys: "Y", src: "neotree", say: "In the tree: copy the file's path to the clipboard", see: "Copies the full path. Handy for pasting into a terminal or chat." },
    { t: "keys", keys: "?", src: "neotree", say: "In the tree: show all tree keys", see: "The full key list for neo-tree. You don't need to memorise more than this lesson covers." },
    { t: "keys", keys: "q", src: "neotree", say: "In the tree: close it", see: "Same result as pressing <kbd>Space</kbd><kbd>e</kbd> again." },
    { t: "say", html: `<p>Less used, but good to know: <kbd>s</kbd> / <kbd>S</kbd> open the file in a vertical / horizontal split, <kbd>/</kbd> filters the tree, <kbd>.</kbd> makes the folder under the cursor the root, <kbd>Backspace</kbd> goes up a level, and <kbd>[g</kbd> / <kbd>]g</kbd> jump between git-modified files. <kbd>Space</kbd><kbd>ge</kbd> opens a git-status view of the tree and <kbd>Space</kbd><kbd>be</kbd> a buffer view.</p>` },
  ]
},
{
  id: "windows", title: "Windows & splits", blurb: "Split the screen, move between panes, zoom, close.",
  steps: [
    { t: "say", html: `<p>Three words that trip everyone up:</p>
      <ul><li><b>Buffer</b>: an open file in memory. These are the “tabs” along the top bar.</li>
      <li><b>Window</b>: a pane on screen that shows one buffer. Splits make more windows.</li>
      <li><b>Tab page</b>: a whole arrangement of windows. You'll rarely need these.</li></ul>
      <p>Closing a <i>window</i> doesn't close the <i>buffer</i>; it's still in the top bar.</p>` },
    { t: "keys", keys: "<leader>|", src: "global", say: "Split the window to the right", see: "Two side-by-side windows showing the same file." },
    { t: "keys", keys: "<leader>-", src: "global", say: "Split the window below", see: "Stacked windows." },
    { t: "keys", keys: "<C-j>", src: "global", say: "Move to the window below", see: "Ctrl + h/j/k/l moves between windows, including neo-tree and the terminal." },
    { t: "keys", keys: "<C-k>", src: "global", say: "Move to the window above", see: "" },
    { t: "keys", keys: "<leader>wm", src: "global", say: "Zoom: maximise this window, press again to restore", see: "Good for briefly reading one file with the tree and other splits open." },
    { t: "keys", keys: "<C-Right>", src: "global", say: "Make the window wider", see: "Ctrl + arrow keys resize the current window." },
    { t: "keys", keys: "<leader>wd", src: "global", say: "Close this window (the buffer stays open)", see: "The pane disappears; the file is still in the top bar." },
    { t: "say", html: `<p><kbd>Space</kbd><kbd>w</kbd> opens the which-key menu for every built-in <kbd>Ctrl-w</kbd> window command. Two worth knowing: <kbd>Ctrl-w</kbd><kbd>=</kbd> evens out all splits, and <kbd>Ctrl-w</kbd><kbd>o</kbd> closes every other window. (The browser won't let this page capture <kbd>Ctrl-w</kbd>; try them in nvim.)</p>` },
    { t: "nvim", html: `Open <code>main.lua</code>. Split right (<kbd>Space</kbd><kbd>|</kbd>), then open <code>lua/callsheet/schedule.lua</code> in the new window with the tree. Split that one down (<kbd>Space</kbd><kbd>-</kbd>). Move around all three panes with <kbd>Ctrl</kbd>+hjkl, zoom one with <kbd>Space</kbd><kbd>wm</kbd>, then close them one at a time with <kbd>Space</kbd><kbd>wd</kbd>.` },
  ]
},
{
  id: "buffers", title: "Buffers (the top bar)", blurb: "Switch, close and pin open files without the mouse.",
  steps: [
    { t: "keys", keys: "<S-l>", src: "global", say: "Next buffer (the one to the right in the top bar)", see: "Shift-L / Shift-H walk along the bufferline. <kbd>]b</kbd> / <kbd>[b</kbd> do the same." },
    { t: "keys", keys: "<S-h>", src: "global", say: "Previous buffer", see: "" },
    { t: "keys", keys: "<leader>bb", src: "global", say: "Flip to the last buffer you were in", see: "Toggles between two files. <kbd>Space</kbd><kbd>`</kbd> does the same thing." },
    { t: "keys", keys: "<leader>,", src: "global", say: "Pick a buffer by name", see: "A picker listing open buffers. Type part of the name and press Enter. Once you have lots of files open this is faster than Shift-H/L." },
    { t: "keys", keys: "<leader>bd", src: "global", say: "Close this buffer (keeps the window layout)", see: "The file leaves the top bar and the window shows the previous buffer instead of closing." },
    { t: "keys", keys: "<leader>bo", src: "global", say: "Close every other buffer", see: "Cleans up the top bar after a lot of jumping around." },
    { t: "keys", keys: "<leader>bp", src: "global", say: "Pin / unpin this buffer", see: "Pinned buffers survive <kbd>Space</kbd><kbd>bP</kbd>, which closes all non-pinned buffers." },
    { t: "nvim", html: `Open four files from the tree. Walk through them with <kbd>Shift</kbd>+H/L, flip back and forth with <kbd>Space</kbd><kbd>bb</kbd>, jump to one with <kbd>Space</kbd><kbd>,</kbd>, then close the rest with <kbd>Space</kbd><kbd>bo</kbd>.` },
  ]
},
{
  id: "pickers", title: "Pickers: find anything", blurb: "Fuzzy-find files, text, symbols, and how the picker window works.",
  steps: [
    { t: "say", html: `<p>Once you know pickers you'll open the tree much less. They're fuzzy, so type fragments: <code>sched</code> finds <code>lua/callsheet/schedule.lua</code>.</p>` },
    { t: "keys", keys: "<leader><Space>", src: "global", say: "Find files (project root)", see: "The main one. Space Space, type a few letters, Enter." },
    { t: "keys", keys: "<leader>/", src: "global", say: "Grep: search text across the project", see: "Live ripgrep. Type <code>call_time</code> to see every use of it." },
    { t: "keys", keys: "<leader>fr", src: "global", say: "Recent files", see: "" },
    { t: "keys", keys: "<leader>sw", src: "global", say: "Grep the word under the cursor", see: "No typing needed." },
    { t: "keys", keys: "<leader>ss", src: "lsp", say: "Symbols in this file (functions, classes…)", see: "Jump to <code>M.build</code> without scrolling." },
    { t: "say", html: `<p><b>Inside a picker</b> you start in insert mode, typing into the search box:</p>
      <table class="mini"><tr><td><kbd>Ctrl-j</kbd> / <kbd>Ctrl-k</kbd></td><td>move down/up the list (arrow keys also work)</td></tr>
      <tr><td><kbd>Enter</kbd></td><td>open</td></tr>
      <tr><td><kbd>Ctrl-v</kbd> / <kbd>Ctrl-s</kbd></td><td>open in a vertical / horizontal split</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>select multiple items</td></tr>
      <tr><td><kbd>Alt-p</kbd></td><td>show/hide the preview</td></tr>
      <tr><td><kbd>Esc</kbd></td><td>switch to <b>normal mode</b> in the picker (j/k to move); <kbd>Esc</kbd> again or <kbd>q</kbd> closes it</td></tr></table>` },
    { t: "keys", keys: "<C-j>", src: "picker", say: "In a picker: move down the list", see: "" },
    { t: "keys", keys: "<C-v>", src: "picker", say: "In a picker: open the selection in a vertical split", see: "Saves doing a split first." },
    { t: "keys", keys: "<leader>sR", src: "global", say: "Reopen the last picker, with your query and position kept", see: "Useful when you open a result, read it, and want to go back to the list." },
    { t: "nvim", html: `With <kbd>Space</kbd><kbd>Space</kbd>, open <code>crew.lua</code>. With <kbd>Space</kbd><kbd>/</kbd>, find every <code>prep</code> and open the one in schedule.lua <b>in a vertical split</b> using <kbd>Ctrl-v</kbd>. Then bring the grep back with <kbd>Space</kbd><kbd>sR</kbd>.` },
    { t: "say", html: `<p>The <kbd>Space</kbd><kbd>s</kbd> menu has a lot more: <kbd>sh</kbd> help pages, <kbd>sk</kbd> keymaps, <kbd>sc</kbd> command history, <kbd>sd</kbd> diagnostics, <kbd>sm</kbd> marks, <kbd>s"</kbd> registers, <kbd>su</kbd> undo history. Press <kbd>Space</kbd><kbd>s</kbd> and browse.</p>` },
  ]
},
{
  id: "lsp", title: "Code navigation (LSP)", blurb: "Go to definition, references, hover, rename, code actions.",
  steps: [
    { t: "say", html: `<p>The practice project is Lua, so <code>lua_ls</code> provides everything here. These keys work the same in any language once its LazyVim extra is installed.</p>` },
    { t: "keys", keys: "gd", src: "lsp", say: "Go to definition", see: "With the cursor on <code>build</code> in <code>schedule.build(...)</code>, this jumps into schedule.lua." },
    { t: "keys", keys: "<C-o>", src: "vim", say: "Jump back to where you were", see: "The pair to remember. <kbd>Ctrl-o</kbd> goes back through your jumps and <kbd>Ctrl-i</kbd> goes forward. <kbd>gd</kbd> followed by <kbd>Ctrl-o</kbd> is how you read code." },
    { t: "keys", keys: "gr", src: "lsp", say: "Find references (every use)", see: "A picker listing each call site." },
    { t: "keys", keys: "K", src: "lsp", say: "Hover docs / type signature", see: "Shows a float with the signature and the <code>---</code> doc comment. Press K again to jump <i>into</i> the float and scroll it." },
    { t: "keys", keys: "<leader>cr", src: "lsp", say: "Rename the symbol everywhere", see: "Renames it across the whole project, not just this file." },
    { t: "keys", keys: "<leader>ca", src: "lsp", say: "Code actions (quick fixes)", see: "A menu of fixes the language server offers at the cursor." },
    { t: "nvim", html: `<ol><li>In <code>main.lua</code> (line 9), put the cursor on <code>build</code> and press <kbd>gd</kbd> to land in schedule.lua.</li>
      <li>There, press <kbd>K</kbd> on <code>call_time</code>, then <kbd>gd</kbd> on it to go into time.lua. Press <kbd>Ctrl-o</kbd> twice to get back to main.lua.</li>
      <li>Back in schedule.lua, press <kbd>gr</kbd> on <code>call_time</code> to see where it's used.</li>
      <li>In schedule.lua, rename the <code>rows</code> local to <code>lines</code> with <kbd>Space</kbd><kbd>cr</kbd>.</li></ol>` },
    { t: "say", html: `<p>Also: <kbd>gI</kbd> goes to the implementation, <kbd>gy</kbd> to the type definition, <kbd>gD</kbd> to the declaration, and <kbd>gK</kbd> shows the signature help. <kbd>]]</kbd> / <kbd>[[</kbd> jump to the next/previous use of the word under the cursor.</p>` },
  ]
},
{
  id: "diagnostics", title: "Diagnostics & Trouble", blurb: "Read and fix errors and warnings, and see them as a list.",
  steps: [
    { t: "say", html: `<p>Diagnostics show up as signs in the left column, as virtual text at the end of the line, and as counts in the status bar. The practice project has two on purpose:</p>
      <ul><li><code>schedule.lua</code>: hint, <i>Unused local ‘unused’.</i></li>
      <li><code>crew.lua</code>: warning, <i>Undefined field ‘rate’.</i></li></ul>` },
    { t: "keys", keys: "]d", src: "global", say: "Jump to the next diagnostic", see: "<kbd>[d</kbd> goes back. <kbd>]e</kbd>/<kbd>[e</kbd> jump only to errors and <kbd>]w</kbd>/<kbd>[w</kbd> only to warnings." },
    { t: "keys", keys: "<leader>cd", src: "global", say: "Show the full message for this line", see: "A float with the complete message, for when the virtual text is cut off." },
    { t: "keys", keys: "<leader>xx", src: "global", say: "Trouble: diagnostics list for the whole project", see: "A panel at the bottom. j/k to move, Enter to jump, q to close. <kbd>Space</kbd><kbd>xX</kbd> shows only the current buffer." },
    { t: "keys", keys: "<leader>cs", src: "global", say: "Trouble: symbols outline", see: "A side panel listing the functions and classes in the file. Good for getting your bearings in a big file." },
    { t: "nvim", html: `<ol><li>Open schedule.lua, press <kbd>]d</kbd> to land on <code>unused</code>, then <kbd>Space</kbd><kbd>cd</kbd> to read the message.</li>
      <li>Delete the line with <kbd>dd</kbd>. The hint goes away.</li>
      <li>Open <kbd>Space</kbd><kbd>xx</kbd> and jump to the <code>rate</code> warning from the list.</li></ol>` },
  ]
},
{
  id: "git", title: "Git: hunks & lazygit", blurb: "See what changed, stage pieces, commit without leaving nvim.",
  steps: [
    { t: "say", html: `<p>Coloured bars in the sign column mark lines changed since the last commit: green added, blue/orange changed, red deleted. A changed block of lines is a <b>hunk</b>. The practice project has uncommitted edits in <code>schedule.lua</code> and <code>notes/todo.md</code>.</p>` },
    { t: "keys", keys: "]h", src: "git", say: "Next git hunk", see: "<kbd>[h</kbd> goes to the previous one." },
    { t: "keys", keys: "<leader>ghp", src: "git", say: "Preview the hunk inline: what it was before", see: "Shows the old lines next to the new ones." },
    { t: "keys", keys: "<leader>ghs", src: "git", say: "Stage this hunk", see: "Stages just this block. The sign changes once it's staged." },
    { t: "keys", keys: "<leader>ghr", src: "git", say: "Reset the hunk (throw the change away)", see: "Careful: this discards the edit. <kbd>u</kbd> undoes it." },
    { t: "keys", keys: "<leader>ghb", src: "git", say: "Blame this line", see: "Shows who changed the line and in which commit." },
    { t: "keys", keys: "<leader>gg", src: "global", say: "Open lazygit", see: "Full-screen git UI in a float." },
    { t: "say", html: `<p><b>Lazygit basics</b> (keys inside lazygit, not LazyVim):</p>
      <table class="mini"><tr><td><kbd>Tab</kbd>/<kbd>h</kbd>/<kbd>l</kbd></td><td>switch panels (files, branches, commits…)</td></tr>
      <tr><td><kbd>j</kbd>/<kbd>k</kbd></td><td>move</td></tr>
      <tr><td><kbd>Space</kbd></td><td>stage/unstage the file</td></tr>
      <tr><td><kbd>Enter</kbd></td><td>open the file to stage individual lines</td></tr>
      <tr><td><kbd>c</kbd></td><td>commit (type the message, then Enter)</td></tr>
      <tr><td><kbd>P</kbd> / <kbd>p</kbd></td><td>push / pull</td></tr>
      <tr><td><kbd>?</kbd></td><td>help for the current panel</td></tr>
      <tr><td><kbd>q</kbd></td><td>quit back to nvim</td></tr></table>` },
    { t: "nvim", html: `In schedule.lua, press <kbd>]h</kbd> to reach the change, preview it with <kbd>Space</kbd><kbd>ghp</kbd>, and stage it with <kbd>Space</kbd><kbd>ghs</kbd>. Open lazygit with <kbd>Space</kbd><kbd>gg</kbd>, stage <code>notes/todo.md</code> with <kbd>Space</kbd>, commit with <kbd>c</kbd>, and quit with <kbd>q</kbd>. (<code>practice --reset</code> undoes all of this.)` },
  ]
},
{
  id: "terminal", title: "The terminal", blurb: "A shell inside nvim that you can toggle away.",
  steps: [
    { t: "keys", keys: "<C-/>", src: "global", say: "Toggle the terminal (project root)", see: "A terminal opens at the bottom. The same key hides it again, and the shell keeps running." },
    { t: "say", html: `<p>In the terminal you're in <b>terminal mode</b>, so keys go to the shell. To leave it:</p>
      <ul><li><kbd>Ctrl-/</kbd> hides it</li>
      <li><kbd>Ctrl-h/j/k/l</kbd> moves to another window, the same as everywhere else</li>
      <li><kbd>Esc</kbd><kbd>Esc</kbd> switches to normal mode so you can scroll and yank the output. Press <kbd>i</kbd> to type again.</li></ul>` },
    { t: "keys", keys: "<leader>ft", src: "global", say: "Terminal at the project root (same as Ctrl-/)", see: "<kbd>Space</kbd><kbd>fT</kbd> opens one at the current working directory." },
    { t: "nvim", html: `Open the terminal with <kbd>Ctrl-/</kbd> and run <code>lua main.lua 3</code>. Press <kbd>Ctrl-k</kbd> to go up to your code, then <kbd>Ctrl-/</kbd> twice to hide the terminal and bring it back. The output is still there.` },
  ]
},
{
  id: "flash", title: "Flash: jump anywhere", blurb: "Jump to anything on screen in about three keystrokes.",
  steps: [
    { t: "keys", keys: "s", src: "global", say: "Flash jump", see: "Type the first one or two letters of where you want to go. Every match gets a coloured label; press the label key to jump there." },
    { t: "keys", keys: "S", src: "global", say: "Flash treesitter: select a code block", see: "Labels the surrounding syntax nodes (argument, call, function). Pick one and it's selected." },
    { t: "say", html: `<p>Flash also works after an operator: <kbd>y</kbd><kbd>r</kbd> (remote) lets you yank something elsewhere on screen without moving the cursor. During a normal <kbd>/</kbd> search, matches get labels too, so you can jump straight to one.</p>` },
    { t: "nvim", html: `In crew.lua, use <kbd>s</kbd> to jump straight to <code>Gaffer</code>, then use <kbd>S</kbd> inside <code>M.day_rate</code> to select the whole function.` },
  ]
},
{
  id: "sessions", title: "Sessions, toggles & housekeeping", blurb: "Restore where you were, toggle UI options, manage plugins.",
  steps: [
    { t: "keys", keys: "<leader>qs", src: "global", say: "Restore the session for this directory", see: "Reopens the files and splits you had last time you were in this folder. Also <kbd>s</kbd> on the dashboard." },
    { t: "keys", keys: "<leader>ql", src: "global", say: "Restore the last session (any directory)", see: "" },
    { t: "say", html: `<p><b>UI toggles</b> live under <kbd>Space</kbd><kbd>u</kbd>. A few useful ones: <kbd>uw</kbd> word wrap, <kbd>ul</kbd> line numbers, <kbd>uL</kbd> relative numbers, <kbd>ud</kbd> diagnostics, <kbd>uh</kbd> inlay hints, <kbd>uf</kbd> format-on-save, <kbd>uC</kbd> colourscheme picker.</p>` },
    { t: "keys", keys: "<leader>uw", src: "global", say: "Toggle word wrap", see: "Good for markdown." },
    { t: "keys", keys: "<leader>n", src: "global", say: "Notification history", see: "For when a message flashed past too quickly. <kbd>Space</kbd><kbd>un</kbd> dismisses all notifications." },
    { t: "keys", keys: "<leader>l", src: "global", say: "Lazy: the plugin manager", see: "<kbd>U</kbd> updates, <kbd>q</kbd> closes. <kbd>Space</kbd><kbd>cm</kbd> opens Mason (language servers and tools)." },
    { t: "say", html: `<p><b>Extras.</b> Run <code>:LazyExtras</code> to see optional language and feature packs, then <kbd>x</kbd> on a line to enable one. You currently have only <code>editor.neo-tree</code> enabled. Adding <code>lang.typescript</code> or <code>lang.python</code> gives those languages the same LSP features you just learned.</p>` },
  ]
},
{
  id: "capstone", title: "Capstone: a real task", blurb: "No keys given. Use everything above to finish the job.",
  steps: [
    { t: "say", html: `<p>Run <code>./practice --reset</code> first. Then do the TODO at the top of <code>notes/todo.md</code>: <b>“Fix day_rate in crew.lua (no rate field yet)”</b>. Try to do it all without the mouse and without <code>:e</code>.</p>` },
    { t: "nvim", html: `Open <code>notes/todo.md</code> with a picker, not the tree.` },
    { t: "nvim", html: `Split right and open <code>crew.lua</code> beside it.` },
    { t: "nvim", html: `Jump to the <code>rate</code> warning with a diagnostic key, and read the full message.` },
    { t: "nvim", html: `Add <code>---@field rate integer</code> to the <code>CrewMember</code> class, and a <code>rate = …</code> to each crew entry. The warning should clear.` },
    { t: "nvim", html: `Use <code>gr</code> on <code>day_rate</code> to check it isn't called anywhere yet.` },
    { t: "nvim", html: `Tick the TODO in todo.md (flip back with <kbd>Space</kbd><kbd>bb</kbd> or <kbd>Ctrl-h</kbd>).` },
    { t: "nvim", html: `Run <code>lua main.lua 3</code> in the terminal and check it still works.` },
    { t: "nvim", html: `Review your hunks with <kbd>]h</kbd>/<kbd>Space</kbd><kbd>ghp</kbd>, then commit in lazygit.` },
    { t: "say", html: `<p>That's the course. Use the <b>Drill</b> tab for a few minutes now and then to keep the keys fresh, and <b>Reference</b> to look up anything in your config.</p>` },
  ]
},
];
