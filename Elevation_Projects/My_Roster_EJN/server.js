const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

let data = []

app.get('/teams', function (req, res) {
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, response) {
        data = JSON.parse(response.toString()).league.standard
        res.end()
    })
})

app.get('/teams/:teamName', function (req, res) {
    console.log('hello');
    let teamName = req.params.teamName
    let team = data.filter(teamMember => teamMember.isActive && teamMember.teamId === teamToIDs[teamName])
        .map(player => {
            return {
                firstName: player.firstName,
                lastName: player.lastName,
                jersey: player.jersey,
                position: player.pos
            }
        })
    console.log(team);
    res.send(team)
})

const port = 3001
app.listen(port, function () {
    console.log(`Server is up and running smoothly`)
})
