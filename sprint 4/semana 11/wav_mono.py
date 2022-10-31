from scipy.io import wavfile

fs, data = wavfile.read('guitarup_full.wav')            # reading the file

wavfile.write('guitar_channel_1.wav', fs, data[:, 0])   # saving first column which corresponds to channel 1
wavfile.write('guitar_channel_2.wav', fs, data[:, 1])   # saving second column which corresponds to channel 2