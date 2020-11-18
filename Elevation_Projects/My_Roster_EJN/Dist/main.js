const onLoad = function () {
    $.get(`/teams`)
}


const render =  data => {
    const source = $('#player-template').html()
    const template = Handlebars.compile(source)
    const playerInfo = template({data})
    $('.player-container').empty().append(playerInfo)
}

const searchTeam = function () {
    let input = $('#input').val()
    console.log(input);
    $.get(`/teams/${input}`, function (data) {
        console.log(data);
        render(data)
    })

}
onLoad()