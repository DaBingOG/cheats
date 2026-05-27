const SECRET_KEY = "304c6528f659c766110239a51cl5dd9c";
const SECRET_IV = "u@}kzW2u[u(8DWar";

let toolsFileBuffer = null;
let toolsSaveFileName = "";
let toolsCheatItems = [];

function toolsGetCipher() {
    const k = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const v = CryptoJS.enc.Utf8.parse(SECRET_IV);
    return { key: k, iv: v, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
}

function toolsCleanJsonData(s) {
    return s.replace(/[\u3000\f\r\t\v]/g, "").replace(/,\s*([}\]])/g, "$1").trim();
}

function toolsXmlFilter(s) {
    if (!s) return "";
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function toolsReplaceAbbr(txt) {
    txt = txt.replace(/\binf\b/gi, "Infinite");
    txt = txt.replace(/\binfi\b/gi, "Infinite");
    return txt;
}

const toolsFixedTranslations = {
    "1 Hit Kill": "一击必杀",
    "Infinite Health": "无限生命",
    "Inf Health": "无限生命",
    "inf Health": "无限生命",
    "Infi Health": "无限生命",
    "inf health": "无限生命",
    "Infi health": "无限生命",
    "Untouchable": "无懈可击"
};

function toolsGetCustomTranslation(text) {
    let processed = toolsReplaceAbbr(text);
    if (toolsFixedTranslations[text]) return toolsFixedTranslations[text];
    if (toolsFixedTranslations[processed]) return toolsFixedTranslations[processed];
    return processed;
}

function updateToolsFileLabel(fileSelector, fileLabel) {
    const f = fileSelector.files[0];
    if (f) fileLabel.innerText = f.name;
    else fileLabel.innerText = "";
}

function toolsPreviewCheatMenu(resultView, menuPreview) {
    const content = resultView.value;
    const previewBox = menuPreview;
    
    if (!content) {
        previewBox.innerHTML = '<div class="tools-no-preview">请先读取或生成金手指内容</div>';
        return;
    }

    const gameMatch = content.match(/Game="([^"]+)"/i);
    const moderMatch = content.match(/Moder="([^"]+)"/i);
    const cusaMatch = content.match(/Cusa="([^"]+)"/i);
    const allVersions = [...content.matchAll(/Version="([^"]+)"/gi)];
    let gameVer = "00.000.000";
    if (allVersions.length >= 2) gameVer = allVersions[1][1];
    else if (allVersions.length >= 1) gameVer = allVersions[0][1];

    const gameName = gameMatch ? gameMatch[1] : "UnknownGame";
    const authorName = moderMatch ? moderMatch[1] : "Unknown";
    const cusaCode = cusaMatch ? cusaMatch[1] : "UnknownID";
    const finalTitle = `${gameName}_${cusaCode}_${gameVer} ☆  By: ${authorName}`;

    const cheatRegex = /<Cheat\s+Text="([^"]+)"(?:\s+Description="([^"]*)")?\s*>/g;
    const matches = [...content.matchAll(cheatRegex)];
    toolsCheatItems = matches;
    
    if (matches.length === 0) {
        previewBox.innerHTML = '<div class="tools-no-preview">未检测到金手指菜单</div>';
        return;
    }

    let html = `<div class="tools-menu-title">☆ ${finalTitle}</div>`;
    matches.forEach((m, idx) => {
        const text = m[1] || "";
        const desc = m[2] || "";
        html += `
        <div class="tools-menu-item">
            <div class="tools-menu-left">
                <input type="text" class="tools-menu-edit" data-type="text" data-idx="${idx}" value="${text.replace(/"/g, "&quot;")}">
                <input type="text" class="tools-menu-desc-edit" data-type="desc" data-idx="${idx}" value="${desc.replace(/"/g, "&quot;")}" placeholder="描述（可选）">
            </div>
            <div class="tools-menu-switch"></div>
        </div>`;
    });
    
    previewBox.innerHTML = html;

    document.querySelectorAll(".tools-menu-edit, .tools-menu-desc-edit").forEach(input => {
        input.addEventListener("input", function(){
            const idx = parseInt(this.dataset.idx);
            const type = this.dataset.type;
            const val = this.value;
            toolsUpdateCheatItem(idx, type, val, resultView);
        });
    });
}

function toolsUpdateCheatItem(index, type, value, resultView) {
    let content = resultView.value;
    const regex = /<Cheat\s+Text="([^"]+)"(?:\s+Description="([^"]*)")?\s*>/g;
    const matches = [...content.matchAll(regex)];
    if (!matches[index]) return;

    const fullTag = matches[index][0];
    const oldText = matches[index][1];
    const oldDesc = matches[index][2] || "";

    let newTag;
    if (type === "text") {
        newTag = `<Cheat Text="${value}" Description="${oldDesc}">`;
    } else {
        newTag = `<Cheat Text="${oldText}" Description="${value}">`;
    }

    content = content.replace(fullTag, newTag);
    resultView.value = content;
    toolsFileBuffer = new TextEncoder().encode(content);
}

async function toolsReadFileContent(fileSelector, resultView, menuPreview, loadingPanel) {
    try {
        const f = fileSelector.files[0];
        if (!f) return alert("请选择文件");
        const fileExt = f.name.split('.').pop().toLowerCase();
        if (!['json', 'shn', 'mc4'].includes(fileExt)) {
            return alert("不支持的文件格式！仅支持 JSON / SHN / MC4");
        }
        const fileContent = await f.text();
        let displayContent = fileContent;
        if (fileExt === 'json') {
            try {
                const jsonObj = JSON.parse(toolsCleanJsonData(fileContent));
                displayContent = JSON.stringify(jsonObj, null, 2);
            } catch (e) {
                alert("JSON文件格式有误，将展示原始内容");
            }
        }
        resultView.value = displayContent;
        toolsFileBuffer = new TextEncoder().encode(displayContent);
        toolsPreviewCheatMenu(resultView, menuPreview);
        if (fileExt === 'json') {
            toolsSaveFileName = f.name.replace(/\.json$/i, ".shn");
        } else if (fileExt === 'shn') {
            toolsSaveFileName = f.name;
        } else if (fileExt === 'mc4') {
            toolsSaveFileName = f.name.replace(/\.mc4$/i, ".shn");
        }
        alert(`✔ 成功读取${fileExt.toUpperCase()}文件内容`);
    } catch(e) {
        alert("✖ 读取文件失败：" + e.message);
    }
}

async function toolsRunTranslate(resultView, loadingPanel, menuPreview) {
    const txt = resultView.value;
    const load = loadingPanel;
    if (!txt) return alert("请先生成内容！");
    try {
        load.style.display = "block";
        const reg = /Cheat Text="([^"]+)"/g;
        const list = [...txt.matchAll(reg)];
        if (list.length === 0) { load.style.display = "none"; return alert("未找到可翻译内容"); }
        
        const resArr = [];
        for (const i of list) {
            const raw = i[1];
            const customTrans = toolsGetCustomTranslation(raw);
            
            let finalTrans = customTrans;
            if (customTrans === raw || customTrans === toolsReplaceAbbr(raw)) {
                try {
                    const req = await fetch("https://api.mymemory.translated.net/get?q="+encodeURIComponent(customTrans)+"&langpair=en|zh-CN");
                    const data = await req.json();
                    finalTrans = data.responseData?.translatedText || customTrans;
                } catch(e) {}
            }
            
            resArr.push({ o: raw, n: finalTrans + " | " + raw });
        }
        
        let finalTxt = txt;
        for (let item of resArr) finalTxt = finalTxt.replaceAll(`Cheat Text="${item.o}"`, `Cheat Text="${item.n}"`);
        resultView.value = finalTxt;
        toolsFileBuffer = new TextEncoder().encode(finalTxt);
        load.style.display = "none";
        toolsPreviewCheatMenu(resultView, menuPreview);
        alert("✔ 翻译完成！共 " + resArr.length + " 项");
    } catch(e) {
        load.style.display = "none";
        alert("✖ 翻译失败：" + e.message);
    }
}

async function toolsRunDecrypt(fileSelector, resultView, menuPreview) {
    try {
        const f = fileSelector.files[0];
        if (!f) return alert("请选择文件");
        const fileExt = f.name.split('.').pop().toLowerCase();
        if (fileExt !== 'mc4') {
            return alert("解密功能仅支持MC4格式文件！");
        }
        const t = await f.text();
        const c = CryptoJS.enc.Base64.parse(t);
        const cfg = toolsGetCipher();
        const d = CryptoJS.AES.decrypt({ ciphertext: c }, cfg.key, cfg);
        const xmlResult = d.toString(CryptoJS.enc.Utf8);
        resultView.value = xmlResult;
        toolsFileBuffer = new TextEncoder().encode(xmlResult);
        toolsSaveFileName = f.name.replace(/\.mc4$/i, ".shn");
        toolsPreviewCheatMenu(resultView, menuPreview);
        alert("✔ 解密完成");
    } catch(e) {
        alert("✖ 解密失败：" + e.message);
    }
}

async function toolsRunConvert(fileSelector, resultView, menuPreview) {
    try {
        const f = fileSelector.files[0];
        if (!f) return alert("请选择文件");
        const fileExt = f.name.split('.').pop().toLowerCase();
        if (fileExt !== 'json') {
            return alert("转换功能仅支持JSON格式文件！");
        }
        const rawText = await f.text();
        const jsonData = JSON.parse(toolsCleanJsonData(rawText));
        const game = toolsXmlFilter(jsonData.name || "Game");
        const cid = toolsXmlFilter(jsonData.id || "");
        const ver = toolsXmlFilter(jsonData.version || "");
        const proc = toolsXmlFilter(jsonData.process || "eboot.bin");
        let out = `<?xml version="1.0" encoding="utf-8"?>
<Trainer Game="${game}" Moder="User" Cusa="${cid}" Version="${ver}" Process="${proc}">
`;
        if (Array.isArray(jsonData.mods)) {
            for (let m of jsonData.mods) {
                const cname = toolsXmlFilter(m.name || "Cheat");
                const desc = m.desc ? toolsXmlFilter(m.desc) : "";
                out += `    <Cheat Text="${cname}" Description="${desc}">\n`;
                if (Array.isArray(m.memory)) {
                    for (let line of m.memory) {
                        const sec = line.section ?? "0";
                        const off = toolsXmlFilter(line.offset || "");
                        const onv = toolsXmlFilter(line.on || "");
                        const ofv = toolsXmlFilter(line.off || "");
                        out += `        <Cheatline>
            <Section>${sec}</Section>
            <Offset>${off}</Offset>
            <ValueOn>${onv}</ValueOn>
            <ValueOff>${ofv}</ValueOff>
        </Cheatline>
`;
                    }
                }
                out += `    </Cheat>\n`;
            }
        }
        out += `</Trainer>`;
        resultView.value = out;
        toolsFileBuffer = new TextEncoder().encode(out);
        toolsSaveFileName = f.name.replace(/\.json$/i, ".shn");
        toolsPreviewCheatMenu(resultView, menuPreview);
        alert("✔ 转换完成");
    } catch(e) {
        alert("✖ 转换失败：" + e.message);
    }
}

function toolsRunSave(resultView) {
    const content = resultView.value;
    if(!content) return alert("暂无内容");
    toolsFileBuffer = new TextEncoder().encode(content);
    const blob = new Blob([toolsFileBuffer], { type: "application/octet-stream" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = toolsSaveFileName || "output.shn";
    a.click();
    URL.revokeObjectURL(a.href);
}