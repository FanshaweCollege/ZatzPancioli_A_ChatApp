export default {
    props: ['msg'],

    template: `
    <div id="message">
        <p class="new-message" :class="{ 'my-message' : matchedID }">
            <span>{{msg.message.name}} says:</span>
            {{msg.message.content}}
        </p>
    </div>
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id
        }
    }
}