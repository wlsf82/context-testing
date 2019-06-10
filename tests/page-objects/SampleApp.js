const helper = require("protractor-helper")
const path = require("path")

class SampleApp {
  constructor() {
    this.expandButton = element(by.id("expand"))
    this.fileInputField = element(by.id("file"))
    this.fileUploadForm = element(by.id("file-upload"))
    this.inputTextField = element(by.id("input"))
    this.result = element(by.id("responseField"))
    this.shortenButton = element(by.id("shorten"))
  }

  shortenUrl(url) {
    this.clearAndFillInputTextFieldWithUrl(url)
    helper.click(this.shortenButton)
  }

  expandUrl(url) {
    this.clearAndFillInputTextFieldWithUrl(url)
    helper.click(this.expandButton)
  }

  clearAndFillInputTextFieldWithUrl(url) {
    helper.clear(this.inputTextField)
    helper.fillFieldWithText(this.inputTextField, url)
  }

  uploadFile(fileName = "cartoon.gif") {
    const relativePathOfFileToUpload = `../assets/${fileName}`
    const absolutePathOfFileToUpload = path.resolve(__dirname, relativePathOfFileToUpload)

    helper.uploadFileIntoInputField(this.fileInputField, absolutePathOfFileToUpload)
  }
}

module.exports = SampleApp
