import * as InboxSDK from '@inboxsdk/core';

const disabledBtn = (disabled = false) => {
  try {
    document.querySelector('.inboxsdk__modal_buttons')
      .childNodes
      .forEach((input) => {
        input.disabled = disabled
      })
  } catch (e) {

  }
}

InboxSDK.load(2, "sdk_OpenAI_c892aa2a0cx")
  .then((sdk) => {  
    sdk.Compose.registerComposeViewHandler((composeView) => {
      composeView.addButton({
        title: "Write this better",
        iconUrl: 'https://image.ibb.co/mXS2ZU/images.png',
        iconClass: "cursor-pointer",
        onClick: function (event) {
          createModal(composeView, sdk.Widgets, sdk)
        },
      });
    });
  });

const generateText = async (context, mode="toast") => {
  try {
    if (mode == "toast") {
      var prompt = "Write a friendly reply to the following email:"
    } else {
      var prompt = "Write a mean/disparaging reply to the following email:"
    }
    const {
      data: {
        choices
      }
    } = await executeOpenAi({
      model: "text-davinci-003",
      prompt: prompt + context.replaceAll('<br>', '\n'),
      temperature: 0,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })

    if (choices && choices.length) {
      return choices[0].text || "No suggestions"
    }

    return inputText.replaceAll('\n', '<br>');
  } catch (e) {
    console.log(e);
    return "No suggestions"
  }
}

const executeOpenAi = (body) => {
  return new Promise(function (resolve, reject) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String("API_KEY")
      },
      body: JSON.stringify(body)
    };
    fetch('https://api.openai.com/v1/completions', requestOptions)
      .then(response => response.json())
      .then(data => {
        resolve({
          data
        })
      })
      .catch(err => {
        reject(err)
      });
  })
}

const createModal = (composeView, Widgets, sdk) => {
  if (!composeView.getHTMLContent().length) {
    return
  }
  var text = ""
  try {
    sdk.Conversations.registerThreadViewHandler((threadView) => {
      var messages = threadView.getMessageViewsAll();
      var msg = messages[messages.length-1];
      var msgBody = msg.getBodyElement();
      text = msgBody.children[0].children[0].innerText;     
      console.log(text);
    });
  } catch (e) {console.log(e);} 

  const el = document.createElement('div');
  el.innerHTML = `<div id="open-ai-div">
    <div id="open-ai-text">Press Auto Reply to generate your response...</div>
  </div>`;

  Widgets.showModalView({
    title: 'AutoReplyBot',
    el,
    chrome: true,
    buttons: [
      {
        text: "Toast",
        onClick: (e) => {
          disabledBtn()
 
          generateText(text)
            .then(response => {
              document.getElementById("open-ai-text").innerText = response
              disabledBtn(false)
            })
        },
        type: "PRIMARY_ACTION",
        color: "blue",
        title: "Auto Generate Toast Reply"
      },
      {
        text: "Roast",
        onClick: (e) => {
          disabledBtn()
 
          generateText(text, "roast")
            .then(response => {
              document.getElementById("open-ai-text").innerText = response
              disabledBtn(false)
            })
        },
        type: "SECONDARY_ACTION",
        color: "green",
        title: "Auto Generate Roast Reply"
      },
      {
        text: "Accept",
        onClick: (e) => {
          const text = document.getElementById("open-ai-text").innerHTML

          if (!["Loading...", "No suggestions"].includes(text)) {
            composeView.setBodyHTML(text);
          }
          e.modalView.close()
        },
        type: "SECONDARY_ACTION",
        title: "Accept the text"
      },
    ]
  });

  disabledBtn()
}
