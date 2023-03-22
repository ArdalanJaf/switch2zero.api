# Carbon Offset Simulator
*This [full-stack](https://github.com/ArdalanJaf/switch2zero) web app allows users to simulate the costs and time to achieve carbon neutrality through tree purchases (planting and upkeep). User inputs their average annual CO2 emmissions and purchases. Each purchase consists of month and year of purchase and number of trees. The RESTful API returns the costs and time it will take, along with graph data to visualise the results.
This was built as part of a 2-day tech challenge (I had about 1.5 days).*

### Deployment
For both front and api:
- npm install
- npm run dev

### Tech-Stack
React (redux),
Node.js,
Axios,
Jest,
Recharts,
Bootstrap React, mySQL.

## Features
- Form allows user to select average CO2 output based on country, or input their own custom value. 
- Tree purchases works as intended. Purchases are limited to 55 per year through state reducer (if you try to enter more, it will input the number that brings you to the 55 limit) and total trees updates dynamically.
- Reading accessibility accounted for.
- Included the optional ability to add an annual interest rate. By default this will only affect the initial purchase cost, but by changing one arg in the revelant simulator's function (cOSUtil.checkForInflation) it can also affect the upkeep cost.
- Whilst the front-end has checks to prevent most invalid inputs, the simulator itself has more robust validation checks (that also act as defensive checks). If incorrect data is sent to the API, it will return the validation errors.
- Returned error msgs are printed on screen, with the erroneuous input/select boxes highlighted. Errors are cleared upon new submission.
- For robustness and to minimise decimal issues, the API expects measurements to be in their smallest practical form (ie. metric tons => kg, dollars => cents). These conversions are made before data is sent to API upon submiting the form.
- The carbon-offset simulator works through a single iteration, with most code abstracted into respective util functions.
- Automated testing is included (use terminal command "npm test").
- Included the option of calculating carbon offset for not-fully-grown trees through a fractional exponential approach instead of simply evenly dividing the max-offset according to the tree's growth. This can be activated through changing an arg in the relevant function (cOSUtil.calcOffset). I included this because it seems like 1 year old sapling offsets far less carbon then a 3 year old tree (based on size alone). I did a little research but more would be required for a more accurate model.
- Upon recieving returned data, the front creates a summary and two graphs (carbon offset and expenditure). If carbon neutrality is achieved, the summary will state exactly when and how many trees were required. If not, the summary will state how many more trees are required.
- Bootstrap React is used for styling. It seemed the quickest solution whilst also affording me the opportunity to get to grips with a new library (I had only used Bootstrap5 before).
- All code is clearly commented (<< comment >> = dev reflections).

**Added on an extra day - use added_feats branch for both [front](https://github.com/ArdalanJaf/switch2zero/tree/added_feats) and [api](https://github.com/ArdalanJaf/switch2zero.api/tree/added_feats) repo**: 
- Fully functioning configuration controls added.
- Middleware security for logging into admin controls, password is stored as hashed in database.
- Data persistence: ability to load/save data - could use a little more work for UX and robustness but fully functioning

## Possible improvement & reflections
*Overall, my biggest critique is that I spent too much time ensuring that the simulator was clear and trying to make the styling a bit more appealing. That time could have been better spent adding more features.*
- Given an extra half day, I would add the ability for the admin to change the simulator controls (including the aforementioned additional options I added to the simulator), persistant data and deploy the app live. I have already done all these things and know it would not take me long.
- A currency converter could be included based on querying a relevant API, giving the user the option to select currency. I did also plan to query an open API to get CO2 per capita stats, had I had more time.
- Login and middleware security could be added for admin controls, to demonstrate those skills.
- Could include the option for users to have their input data and results emailed to them through nodemailer.
- Testing could be more comprehensive. Given a little more time, I would have written tests for the simulator's key util functions. Nonetheless I wanted to demonstrated that I am capable of implementing automated testing.
- The form's select inputs could have a predictive text input feature (if I type "M", list reduces to "March, May").
- The styling could definitely be improved. As well as the overall design, I would add animations, make fully responsive and a more dynamic error feedback system (eg. once user corrects individual error, error text and input highlight dissapears).


Overall I enjoyed the challenge and appreciate the opportunity!

