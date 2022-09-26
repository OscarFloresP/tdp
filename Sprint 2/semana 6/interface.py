from tkinter import *
from tkinter import messagebox
import webbrowser

class Interface:
    def __init__(self):
        self.__start_tk__()
        self.__start_main_menu__()
    def __start_tk__(self):
        self.root = Tk()
        self.root.resizable(width=False, height=False)
        self.root.geometry("600x150") 
    
    def __start_main_menu__(self):
    
        self.startButton = Button(text="Spawnear",command=self.run)
        self.URLTextBox = Text(self.root,height=1,width=50)
        self.NumberSpawnTextBox = Text(self.root,height=1,width=5)
        self.URLLabel = Label(self.root,text="Link")
        self.NumberSpawnLabel = Label(self.root,text="Numero de veces")
    

        self.startButton.place(x=20,y=100)
        self.URLTextBox.place(x=160,y=20)
        self.NumberSpawnTextBox.place(x=160,y=50)
        self.URLLabel.place(x=20,y=20)
        self.NumberSpawnLabel.place(x=20,y=50)
        
        
    def run(self):
        URL = self.URLTextBox.get(1.0, "end-1c")
        NumberSpawn = self.NumberSpawnTextBox.get(1.0, "end-1c")
        self.URL = str(URL)
        try:
            self.NumberSpawn = int(NumberSpawn)
        except:
            messagebox.showinfo("Error","El numero de veces de ser un entero")
            return
        webbrowser.register('chrome',
	    None,
	    webbrowser.BackgroundBrowser("C://Program Files (x86)//Google//Chrome//Application//chrome.exe"))
        for i in range(self.NumberSpawn):
            webbrowser.get('chrome').open(self.URL)

if __name__ == "__main__":
        
    I = Interface()

    I.root.mainloop()


