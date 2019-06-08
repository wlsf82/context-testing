const Eyes = require("eyes.selenium").Eyes
const eyes = new Eyes()

const helper = require("protractor-helper")
const path = require("path")

const SampleApp = require("../page-objects/SampleApp")

const context = process.env.TEST_CONTEXT

if (context !== 'accessibility' && context !== 'functional' && context !== 'visual') {
  console.log(`Invalid test mode: ${context}`)
} else {
  console.log(`Running tests in ${context} mode.`)

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
        helper.clearFieldAndFillItWithText(sampleApp.inputTextField, expandedUrl)
        helper.click(sampleApp.shortenButton)
      
        helper.waitForTextToBePresentInElement(sampleApp.result, shortUrl)
      })
      
      it("expands a URL", () => {
        helper.clearFieldAndFillItWithText(sampleApp.inputTextField, shortUrl)
        helper.click(sampleApp.expandButton)
      
        helper.waitForTextToBePresentInElement(sampleApp.result, expandedUrl)
      })
    })
      
    describe("file upload", () => {
      it(SHOW_FILE_NAME_ON_UPLOAD_BUTTON, () => {
        const CARTOON_DOT_GIF = "cartoon.gif"
        const relativePathOfFileToUpload = `../assets/${CARTOON_DOT_GIF}`
        const absolutePathOfFileToUpload = path.resolve(__dirname, relativePathOfFileToUpload)
  
        helper.uploadFileIntoInputField(sampleApp.fileInputField, absolutePathOfFileToUpload)
            
        helper.waitForTextToBePresentInElement(sampleApp.fileUploadForm, CARTOON_DOT_GIF)
        contextValidation(context)
      })
    })
  })
  
  function contextValidation(ctx) {
    switch(ctx) {
      case "accessibility":
        console.log(`Running ${ctx} validation...`)
        break
      case "functional":
        break
      case "visual":
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
        eyes.open(browser, SAMPLE_APP, SHOW_FILE_NAME_ON_UPLOAD_BUTTON)
        eyes.checkWindow(`${ctx} validataion`)
        eyes.close()
        break
      default:
        break
    }
  }
}