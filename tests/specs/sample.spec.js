const helper = require("protractor-helper")

const SampleApp = require("../page-objects/SampleApp")

const contextValidation = require("../contextValidator")

const context = process.env.TEST_CONTEXT

const SAMPLE_APP = "Sample app"
const SHOW_FILE_NAME_ON_UPLOAD_BUTTON = "show file name on upload button"

describe(SAMPLE_APP, () => {
  let sampleApp

  beforeEach(() => {
    sampleApp = new SampleApp()
    browser.get("")
  })
    
  describe("shorten/expand", () => {
    const shortUrl = "https://foo.bar"
    const expandedUrl = "https://foo.bar.baz.bah.boo"
      
    it("shortens a URL", () => {
      sampleApp.shortenUrl(expandedUrl)
      
      helper.waitForTextToBePresentInElement(sampleApp.result, shortUrl)
    })
      
    it("expands a URL", () => {
      sampleApp.expandUrl(shortUrl)
      
      helper.waitForTextToBePresentInElement(sampleApp.result, expandedUrl)
    })
  })
      
  describe("file upload", () => {
    it(SHOW_FILE_NAME_ON_UPLOAD_BUTTON, () => {
      sampleApp.uploadFile()
            
      helper.waitForTextToBePresentInElement(sampleApp.fileUploadForm, "cartoon.gif")
      contextValidation(context, browser, SAMPLE_APP, SHOW_FILE_NAME_ON_UPLOAD_BUTTON)
    })
  })
})
