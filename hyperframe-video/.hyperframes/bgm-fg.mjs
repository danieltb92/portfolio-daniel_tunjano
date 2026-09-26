import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { pythonInvocation } from "file:///C:/Users/danie/.agents/skills/media-use/audio/scripts/lib/python.mjs";

// Reuse the engine's inline script builder by reconstructing from bgm.mjs source
// — simpler: just run a minimal inline script equivalent.
const prompt = "confident minimal electronic underscore for a design portfolio brand intro, clean modern synth textures, subtle pulse, BPM 115, MAJOR";
const abs = "C:\\Users\\danie\\Videos\\danieltunjano-intro\\assets\\bgm\\track.wav";
const script = `
import math, os, sys, traceback
from pathlib import Path
import numpy as np
import soundfile as sf
from transformers import MusicgenForConditionalGeneration, AutoProcessor

prompt = ${JSON.stringify(prompt)}
out_path = ${JSON.stringify(abs)}
target_s = 30.0
seed_s = 28.0
token_rate = 50
crossfade_s = 0.3

def apply_fade(arr, sr, fade_in_s=0.08, fade_out_s=0.5):
    n_in = min(int(round(fade_in_s * sr)), arr.shape[0] // 2)
    n_out = min(int(round(fade_out_s * sr)), arr.shape[0] // 2)
    if n_in > 1: arr[:n_in] *= np.linspace(0.0, 1.0, n_in, dtype="float32")
    if n_out > 1: arr[-n_out:] *= np.linspace(1.0, 0.0, n_out, dtype="float32")
    return arr

def loop_crossfade(seed, target_len, xf):
    if seed.shape[0] >= target_len: return seed[:target_len]
    xf = min(xf, seed.shape[0] // 2)
    if xf < 1:
        reps = int(math.ceil(target_len / seed.shape[0]))
        return np.tile(seed, reps)[:target_len]
    t = np.linspace(0.0, 1.0, xf, dtype="float32")
    fade_out = np.cos(t * (math.pi / 2)); fade_in = np.sin(t * (math.pi / 2))
    out = seed.copy()
    while out.shape[0] < target_len:
        tail = out[-xf:] * fade_out; head = seed[:xf] * fade_in
        out = np.concatenate([out[:-xf], tail + head, seed[xf:]])
    return out[:target_len]

try:
    Path(os.path.dirname(out_path)).mkdir(parents=True, exist_ok=True)
    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
    model.eval()
    sr = int(model.config.audio_encoder.sampling_rate)
    gen_s = min(seed_s, target_s)
    tokens = max(1, int(math.ceil(gen_s * token_rate)))
    print(f"[musicgen] seed dur={gen_s:.2f}s tokens={tokens}", flush=True)
    inputs = processor(text=[prompt], padding=True, return_tensors="pt")
    audio = model.generate(**inputs, max_new_tokens=tokens)
    seed = audio[0, 0].detach().cpu().numpy().astype("float32")
    peak = float(np.max(np.abs(seed)))
    if peak > 1e-6: seed = seed * (0.89 / peak)
    want = max(1, int(round(target_s * sr)))
    if seed.shape[0] >= want:
        final = seed[:want].copy()
    else:
        final = loop_crossfade(seed, want, int(round(crossfade_s * sr)))
    if final.shape[0] < want: final = np.pad(final, (0, want - final.shape[0]))
    else: final = final[:want]
    final = apply_fade(final, sr)
    peak = float(np.max(np.abs(final)))
    if peak > 1.0: final = final / peak
    sf.write(out_path, final, sr)
    print(f"[musicgen] wrote {out_path} samples={final.shape[0]} sr={sr}", flush=True)
except Exception:
    traceback.print_exc(); sys.exit(1)
`;

const { cmd, args } = pythonInvocation(["-c", script]);
console.log("running foreground musicgen…");
const r = spawnSync(cmd, args, { encoding: "utf8", timeout: 15 * 60 * 1000, maxBuffer: 16 * 1024 * 1024 });
process.stdout.write(r.stdout || "");
process.stderr.write(r.stderr || "");
console.log("status:", r.status, "signal:", r.signal, "error:", r.error?.message);
process.exit(r.status ?? 1);
