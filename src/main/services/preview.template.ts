export const PREVIEW_TEMPLATE = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webtoon Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #1a1a1a;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            color: #fff;
        }
        .controls {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #2a2a2a;
            padding: 12px 20px;
            display: flex;
            gap: 12px;
            align-items: center;
            z-index: 100;
            border-bottom: 1px solid #444;
        }
        .controls label { font-size: 13px; }
        .controls select, .controls input {
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid #555;
            background: #333;
            color: #fff;
            font-size: 13px;
        }
        .controls input[type="number"] { width: 70px; }
        .device-frame {
            margin-top: 70px;
            border: 2px solid #555;
            border-radius: 16px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }
        .viewport {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        .viewport img { display: block; width: 100%; }
    </style>
</head>
<body>
    <div class="controls">
        <label>Device:</label>
        <select id="deviceSelect">
            {{DEVICE_OPTIONS}}
        </select>
        <label>W:</label>
        <input type="number" id="customWidth" value="{{DEFAULT_WIDTH}}" />
        <label>H:</label>
        <input type="number" id="customHeight" value="{{DEFAULT_HEIGHT}}" />
        <label>Gap:</label>
        <input type="number" id="imageGap" value="{{IMAGE_GAP}}" min="0" />
    </div>

    <div class="device-frame" id="deviceFrame">
        <div class="viewport" id="viewport">
{{IMAGE_ELEMENTS}}
        </div>
    </div>

    <script>
        const viewport = document.getElementById('viewport');
        const deviceFrame = document.getElementById('deviceFrame');
        const deviceSelect = document.getElementById('deviceSelect');
        const customWidth = document.getElementById('customWidth');
        const customHeight = document.getElementById('customHeight');
        const imageGap = document.getElementById('imageGap');
        const images = viewport.querySelectorAll('img');

        function applySize() {
            const w = parseInt(customWidth.value);
            const h = parseInt(customHeight.value);
            viewport.style.width = w + 'px';
            viewport.style.height = h + 'px';
            deviceFrame.style.width = (w + 4) + 'px';
        }

        function applyGap() {
            const gap = parseInt(imageGap.value) || 0;
            images.forEach(img => { img.style.marginBottom = gap + 'px'; });
        }

        deviceSelect.addEventListener('change', function() {
            const opt = this.selectedOptions[0];
            customWidth.value = opt.dataset.width;
            customHeight.value = opt.dataset.height;
            applySize();
        });

        customWidth.addEventListener('input', applySize);
        customHeight.addEventListener('input', applySize);
        imageGap.addEventListener('input', applyGap);

        applySize();
    </script>
</body>
</html>`
