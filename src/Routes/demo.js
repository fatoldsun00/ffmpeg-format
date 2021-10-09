const app = require("express");
const demoRouter = app.Router();

//Montage des routes
demoRouter.route("/").get((req, res, next) => {
    res.status(200).send(
        `<HTML>
        <body>
        <div>
          <label for="text">Enter your text: </label>
          <input type="text" name="text" id="text" required>
        </div>
        <div>
          <label for="text">Enter your resolution: </label>
          <input type="text" name="resolution" id="resolution" value="1980 x 1024" required>
        </div>
        <div>
          <label for="text">Enter your duration: </label>
          <input type="text" name="duration" id="duration" value="60.0s" required>
        </div>
        <div>
          <label for="text">Enter your X position: </label>
          <input type="text" name="X" id="X">
        </div>
        <div>
          <label for="text">Enter your Y position: </label>
          <input type="text" name="Y" id="Y" >
        </div>
        <div>
          <label for="text">Enter your startTime: </label>
          <input type="text" name="startTime" id="startTime" >
        </div>
        <div>
          <label for="text">Enter your endTime: </label>
          <input type="text" name="endTime" id="endTime" >
        </div>
        <div>
          <input type="button" value="translate" onclick='translate()'>
        </div>
        <div id='result' style="color: 'green'">
        
        </div>
        <div id='error' style="color: 'red'">
        
        </div>
        <script>
        async function translate(){
          document.querySelector('#result').innerHTML = ''
          document.querySelector('#error').innerHTML = ''
          const formData = new FormData();
          formData.append('text',document.querySelector('#text').value)
          formData.append('resolution',document.querySelector('#resolution').value)
          formData.append('duration',document.querySelector('#duration').value)
          formData.append('X',document.querySelector('#X').value || 0)
          formData.append('Y',document.querySelector('#Y').value || 0)
          formData.append('startTime',document.querySelector('#startTime').value || 0)
          formData.append('endTime',document.querySelector('#endTime').value || parseFloat(document.querySelector('#duration').value))
          formData.append('inputPath','input_demo.mpeg')
          formData.append('outputPath','output_demo.mpeg')
          const result = await fetch("/api/overlay/text?lang=en", {
            method: "POST",
            body: formData
          })

          
          if (result.status !== 200){
            const {errmsg} = await result.json()
            document.querySelector('#error').innerHTML =  "❌ " + errmsg
          } else {
            document.querySelector('#result').innerHTML = await result.text()
          }
        }
        </script>
      </body>`
    );
    next();
});

module.exports = demoRouter;
