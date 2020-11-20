const onLoad = function () {
    $.get(`/teams`)
}


class Renderer {
  renderData(data) {
    const source = $('#player-template').html()
    const template = Handlebars.compile(source)
    const playerInfo = template({data})
    $('.player-container').empty().append(playerInfo)
  }
}

const render = new Renderer()

const searchTeam = function () {
    let input = $('#input').val()
    $.get(`/teams/${input}`, function (data) {
        render.renderData(data)
    })

}
onLoad()