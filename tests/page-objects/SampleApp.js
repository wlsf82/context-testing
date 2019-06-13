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
    helper.fillFieldWithText(this.inputTextField, url)
    helper.click(this.shortenButton)
  }

  expandUrl(url) {
    helper.fillFieldWithText(this.inputTextField, url)
    helper.click(this.expandButton)
  }

  uploadSampleFile() {
    const relativePathOfFileToUpload = "../assets/cartoon.gif"
    const absolutePathOfFileToUpload = path.resolve(__dirname, relativePathOfFileToUpload)

    helper.uploadFileIntoInputField(this.fileInputField, absolutePathOfFileToUpload)
  }
}

module.exports = SampleApp
