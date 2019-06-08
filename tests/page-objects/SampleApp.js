class SampleApp {
  constructor() {
    this.expandButton = element(by.id("expand"))
    this.fileInputField = element(by.id("file"))
    this.fileUploadForm = element(by.id("file-upload"))
    this.inputTextField = element(by.id("input"))
    this.result = element(by.id("responseField"))
    this.shortenButton = element(by.id("shorten"))
  }
}

module.exports = SampleApp;