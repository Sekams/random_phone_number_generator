import saveAs from 'file-saver';

class InputOutput {
  /**
   * createTextFile create file on hard drive
   * @param  string  filepath   Path to file on hard drive
   * @param  array   content     Data to write
   */
  static createTextFile = (filepath, content) => {
    const blob = new Blob(content, {type: "text/plain;charset=utf-8"});
    saveAs(blob, filepath);
  }

  /**
   * writeTextFile write data to file on hard drive
   * @param  string  filepath   Path to file on hard drive
   * @param  sring   output     Data to be written
   */
  static writeTextFile = (filepath, output) => {
    const txtFile = new File(filepath);
    txtFile.open("w"); //
    txtFile.writeln(output);
    txtFile.close();
  }

  /**
   * readTextFile read data from file
   * @param  string   filepath   Path to file on hard drive
   * @return string              String with file data
   */
  static readTextFile = (filepath) => {
    let outputString = '';
    var txtFile = new File(filepath);
    txtFile.open('r');
    while (!txtFile.eof) {
      // read each line of text
      outputString = `${outputString} ${txtFile.readln()} \n`;
    }
    return outputString;
  }
}

export default InputOutput;
