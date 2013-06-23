var LinkInfoView = Backbone.View.extend({
    tagName: "div",
    className: "linkInfo",
    collection: LinkCollection,
    initialize: function (args) {
        this.listenTo(this.collection,"add remove change",this.render);
        this.template=_.template(LinkTemplate);
        this.$el.html(this.template());
        this.render();
    },
    events: {
        "click .inLink-up": "incIncomingLinks",
        "click .inLink-down": "decIncomingLinks",
        "click .outLink-up": "incOutgoingLinks",
        "click .outLink-down": "decOutgoingLinks"
    },
    incIncomingLinks: function() {
        this.collection.add(new Link(-1));
    },
    decIncomingLinks: function() {
        if (this.collection.countIncoming()>0) {
            var incoming = this.collection.getIncoming();
            var f = incoming[0];
            this.collection.remove(f);
        }
    },
    incOutgoingLinks: function() {
        if (this.collection.countOutgoing()<8) {
            this.collection.add(new Link(1));
        }
    },
    decOutgoingLinks: function() {
        if (this.collection.countOutgoing()>0) {
            var outgoing = this.collection.getOutgoing();
            var f = outgoing[0];
            this.collection.remove(f);
        }
    },
    render: function () {
        $('#numLinksIncoming').text(this.collection.countIncoming());
        $('#numLinksOutgoing').text(this.collection.countOutgoing() + "/8");
        $('#linkMitigation').text(this.collection.linkMitigation());
        return this;
    }
});

var LinkTemplate = '\
Number of links:\
    <div style="position: relative; height: 40px; margin-bottom: 10px">\
        <div style="position: absolute">Incoming:</div>\
        <div style="position: absolute; left: 80px" id="numLinksIncoming">0</div>\
        <div style="width: 15px; position: absolute; left: 95px">\
            <div class="arrow-up inLink-up" title="One more incoming link"></div>\
            <div class="arrow-down inLink-down" title="One less incoming link"></div>\
        </div>\
        <div style="position: absolute; left: 140px">Outgoing:</div>\
        <div style="position: absolute; left: 210px" id="numLinksOutgoing">0/8</div>\
        <div style="width: 15px; position: absolute; left: 235px">\
            <div class="arrow-up outLink-up" title="One more outgoing link"></div>\
            <div class="arrow-down outLink-down" title="One less outgoing link"></div>\
        </div>\
        <br />\
    Link mitigation: <span id="linkMitigation">0</span><br />\
    </div>\
';
