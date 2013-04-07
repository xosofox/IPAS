var AttackInfoView = Backbone.View.extend({
    render: function () {
        var level = this.model.get("level");
        var html = '';
        html += ('<span style="color: ' + level_color[level - 1] + '">L' + level + '</span> ');
        var damageTotal = this.model.get("damageTotal");
        var energyPortal = this.model.get("energyPortal");
        var energyPortalMax = this.model.get("energyPortalMax");
        var percentage = Math.round(energyPortal / energyPortalMax * 1000) / 10;
        html += 'Dmg: ' + Math.round(damageTotal / 1000 * 10) / 10 + 'K, Portal: ' + Math.round(energyPortal / 1000 * 10) / 10 + 'K/' + energyPortalMax / 1000 + 'K (' + percentage + '%)';
        this.$el.html(html);
        return this;
    }
});