const recorderButton = document.getElementById("Recorder");
let recorder;
let chunks = [];
let recording = false;

recorderButton.addEventListener("click", async () => {
    if (!recording) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
        });
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => chunks.push(event.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/mp4" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "recordingLM.mp4";
            a.click();
            URL.revokeObjectURL(url);
            chunks = [];
            recorderButton.textContent = "REC";
            recording = false;
        };
        recorder.start();
        recorderButton.textContent = "STOP";
        recording = true;
    } else {
        recorder.stop();
    }
});
