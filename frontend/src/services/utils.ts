export const utils = {
  playAudio,
};

async function playAudio(fileName: string) {
  const audio = new Audio();
  const { default: audioSrc } = await import(
    `../assets/sounds/${fileName}-sound.mp3`
  );
  audio.src = audioSrc;
  await audio.play();
}
