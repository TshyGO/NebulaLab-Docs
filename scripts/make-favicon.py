"""从 docs/public/logo.png 重新生成站点 favicon 套件。

logo 换了的时候跑一次即可：

    python scripts/make-favicon.py

源图是不透明白底的橙色 N。直接缩到 16x16 的话笔画会被抗锯齿冲淡，在标签栏里
几乎看不见，所以成品改成品牌色圆角底 + 反白 N：同一个标志反相使用，小尺寸下
辨识度最高，深浅两种标签栏背景都成立。

依赖 Pillow：pip install pillow
"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'docs' / 'public'
SRC = PUBLIC / 'logo.png'

BRAND = (216, 98, 68)  # #D86244，从源图取样得到的主色


def load_glyph():
    """把白底源图还原成反白字形。

    源图每个像素都是 BRAND 和白色的线性混合，用绿通道反解混合比例当 alpha，
    边缘的抗锯齿就能干净地保留下来，不会出现白边。
    """
    src = Image.open(SRC).convert('RGB')
    w, h = src.size
    delta = 255 - BRAND[1]
    mask = Image.new('L', (w, h))
    ps, pm = src.load(), mask.load()
    for y in range(h):
        for x in range(w):
            a = (255 - ps[x, y][1]) / delta
            pm[x, y] = round((0.0 if a < 0 else (1.0 if a > 1 else a)) * 255)

    bbox = mask.getbbox()
    glyph = Image.new('RGBA', (bbox[2] - bbox[0], bbox[3] - bbox[1]), (255, 255, 255, 255))
    glyph.putalpha(mask.crop(bbox))
    return glyph


def build(glyph, size, fill_ratio=0.66, radius_ratio=0.22):
    """品牌色圆角底 + 居中反白字形。先 4 倍绘制再缩，圆角才不会有锯齿。"""
    up = size * 4
    canvas = Image.new('RGBA', (up, up), (0, 0, 0, 0))
    ImageDraw.Draw(canvas).rounded_rectangle(
        [0, 0, up - 1, up - 1], radius=int(up * radius_ratio), fill=(*BRAND, 255)
    )
    canvas = canvas.resize((size, size), Image.LANCZOS)

    target = round(size * fill_ratio)
    gw, gh = glyph.size
    scale = target / max(gw, gh)
    g = glyph.resize((max(1, round(gw * scale)), max(1, round(gh * scale))), Image.LANCZOS)
    canvas.paste(g, ((size - g.width) // 2, (size - g.height) // 2), g)
    return canvas


def main():
    glyph = load_glyph()
    build(glyph, 32).save(PUBLIC / 'favicon-32.png')
    build(glyph, 48).save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
    # iOS 主屏图标不支持透明（会被合成到黑底），所以铺满不留圆角，交给系统去切
    build(glyph, 180, fill_ratio=0.60, radius_ratio=0.0).convert('RGB').save(PUBLIC / 'apple-touch-icon.png')

    for name in ('favicon.ico', 'favicon-32.png', 'apple-touch-icon.png'):
        im = Image.open(PUBLIC / name)
        print(f'{name:24} {im.size} {im.mode}')


if __name__ == '__main__':
    main()
