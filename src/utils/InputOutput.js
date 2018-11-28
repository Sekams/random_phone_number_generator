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
}

export default InputOutput;
