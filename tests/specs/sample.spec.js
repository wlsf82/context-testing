const Eyes = require("eyes.selenium").Eyes
const eyes = new Eyes()
eyes.setApiKey(process.env.APPLITOOLS_API_KEY)

const helper = require("protractor-helper")
const path = require("path")

const context = process.env.TEST_CONTEXT

if (context !== 'accessibility' && context !== 'functional' && context !== 'visual') {
  console.log(`Invalid test mode: ${context}`)
} else {
  console.log(`Running tests in ${context} mode.`)

  const SAMPLE_APP = "Sample app"
  const SHOW_FILE_NAME_ON_UPLOAD_BUTTON = "show file name on upload button"

  describe(SAMPLE_APP, () => {
    beforeEach(() => browser.get(""))
    
    describe("shorten/expand", () => {
      const shortUrl = "https://foo.bar"
      const expandedUrl = "https://foo.bar.baz.bah.boo"
      
      it("shortens a URL", () => {
        const inputTextField = element(by.id("input"))
        const shortenButton = element(by.id("shorten"))
      
        helper.clearFieldAndFillItWithText(inputTextField, expandedUrl)
        helper.click(shortenButton)
      
        const result = element(by.id("responseField"))
        helper.waitForTextToBePresentInElement(result, shortUrl)
      })
      
      it("expands a URL", () => {
        const inputTextField = element(by.id("input"))
        const expandButton = element(by.id("expand"))
      
        helper.clearFieldAndFillItWithText(inputTextField, shortUrl)
        helper.click(expandButton)
      
        const result = element(by.id("responseField"))
        helper.waitForTextToBePresentInElement(result, expandedUrl)
      })
    })
      
    describe("file upload", () => {
      it(SHOW_FILE_NAME_ON_UPLOAD_BUTTON, () => {
        const CARTOON_DOT_GIF = "cartoon.gif"
        const relativePathOfFileToUpload = `../assets/${CARTOON_DOT_GIF}`
        const absolutePathOfFileToUpload = path.resolve(__dirname, relativePathOfFileToUpload)
  
        const fileInputField = element(by.id("file"))
        helper.uploadFileIntoInputField(fileInputField, absolutePathOfFileToUpload)
            
        const fileUploadForm = element(by.id("file-upload"))
        helper.waitForTextToBePresentInElement(fileUploadForm, CARTOON_DOT_GIF)
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
        eyes.open(browser, SAMPLE_APP, SHOW_FILE_NAME_ON_UPLOAD_BUTTON)
        eyes.checkWindow(`${ctx} validataion`)
        eyes.close()
        break
      default:
        break
    }
  }
}