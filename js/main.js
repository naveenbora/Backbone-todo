
const Todo_item=Backbone.Model.extend({
    initialize: function(option){
        
        
    },
    defaults: {
        "name":"",
        "time":Date().toString("yyyy/MM/dd"),
        "status":false,
        "remove":"<i class='fa fa-times-circle delete'></i>"

    }
});
const Todo_collection=Backbone.Collection.extend({
    Model:Todo_item,
    
        url: './api/items.json',
   
    parse: function(response) {
        
        return response.items;
      }
})

const AllItems=new Todo_collection({});

AllItems.fetch({});

$('.Add-Button').click(function(){
    if($('#todo-text-box').val()!=''){
        AllItems.add(new Todo_item({name:$('#todo-text-box').val()}))
        console.log(AllItems);
    }
})


const Todo_item_view=Backbone.View.extend({
    tagName:'p',
    events:{
        'click .delete':function(){
            console.log(this.model);
            AllItems.remove(this.model)
            
        },
        'click #myCheck':function(event){
            const ischecked=$(event.target).is(":checked");
            const present=this.model.set("status",ischecked);
            todo_collection_view.add();
        },
        },
        addcheck(){
            console.log(this.$el.children('input'));
            
            this.$el.children('input').attr('checked', this.model.get('status'));
            if(this.model.get('status')===true)
            {
                this.$el.children('input').next().toggleClass("strike");
            }
        },
    render(){
        this.$el.html("<input type='checkbox' id='myCheck'><span>"+this.model.get('name')+"</span>"+this.model.get('remove'));
        this.addcheck(this.$el);
        return this;
    }
})
const Todo_collection_view=Backbone.View.extend({
    el:"#main-table",
    initialize(){
        this.model.on('add remove',this.add,this)
    },
    add:function(){
        this.$el.empty();
        this.render();
    },
    render(){
        this.model.each(todo =>{
           const eachview= new Todo_item_view({model:todo});
           this.$el.append(eachview.render().$el);
        })
        return this;    
        
    }

})
const todo_collection_view=new Todo_collection_view({model:AllItems});
todo_collection_view.render();

$('.deleteSelected').click(()=>{
    
    var remove = [];
   AllItems.each(item =>{
       if(item.get('status')==true){
           remove.push(item)
       }
   })
   
AllItems.remove(remove);
   
})
$('.deleteAll').click(()=>{
    AllItems.reset();
    todo_collection_view.add();
})
