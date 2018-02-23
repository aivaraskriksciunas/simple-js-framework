const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

const Simpleton = ( model ) => {
    // Create an object for the root element
    var rootElement = new Element( document.querySelector( model.el ) );

    // Initialize the root element
    rootElement.create( model );

    var modelProxy = {
        set: ( target, name, value ) => {
            target[name] = value;

            rootElement.update( model, name );
        }
    }

    model.data = new Proxy( model.data, modelProxy );

}

function Element( domElement ) {
    this.domElement = domElement;
    this.children = [];
    this.conditionalClasses = [];

    this.create = ( model ) => {
        var nodesList = this.domElement.childNodes;
        for ( let nodeIndex = 0; nodeIndex < nodesList.length; nodeIndex++ ) {
            // Get the list of every node
            let node = nodesList[nodeIndex];

            switch ( node.nodeType ) {
                case ELEMENT_NODE:
                    let childElement = new Element( node );
                    childElement.create( model );

                    this.children.push( childElement );
                    break;
                case TEXT_NODE:
                    // Ingore emtpy text nodes
                    if ( node.data.trim().length === 0 ) continue;

                    let childTextNode = new TextNode( node );
                    childTextNode.create( model );
                    this.children.push( childTextNode );
                    break;
            }
        }
        
        this.readAttributes( model );
        
    }

    this.readAttributes = ( model ) => {
        // Read attributes
        let attributesList = this.domElement.attributes;
        const regexp = /sl-(\w+)(?:\.(\w+))?/g;

        for ( let index = 0; index < attributesList.length; index++ ) {
            let attribute = attributesList[index];

            let matchResult = regexp.exec( attribute.name );
            if ( matchResult === null ) continue;
            
            switch( matchResult[1] ) {
                case "class":
                    // Append this class to conditional classes list
                    this.conditionalClasses.push( { 
                        className: matchResult[2], 
                        condition: attribute.value 
                    } );
                    break;
                case "on":
                    this.domElement.addEventListener( "click", 
                        () => model.data[attribute.value]( model.data )  );
                    break;
                case "model":
                    this.domElement.addEventListener( "input", 
                        () => model.data[attribute.value] = this.domElement.value );
            }

            // Remove the evaluated attribute
            attributesList.removeNamedItem( matchResult[0] );
        }

        this.updateClasses( model );
    }

    // Updates every child element
    this.update = ( model, changedValue ) => {
        for ( let i = 0; i < this.children.length; i++ ) {
            this.children[i].update( model, changedValue );
        }

        this.updateClasses( model, changedValue );
    }

    this.updateClasses = ( model, changedValue ) => {

        for ( let i = 0; i < this.conditionalClasses.length; i++ ) {
            // Test the condition
            let className = this.conditionalClasses[i].className;
            if ( model.data[this.conditionalClasses[i].condition] ) {
                this.domElement.classList.add( className );
            }
            else {
                this.domElement.classList.remove( className );
            }
        }
    }
}

function TextNode( node ) {
    this.node = node;
    this.originalText = node.data.trim();
    // Stores which values are used in this node, 
    // to preven unnecessary repaints
    this.usedValues = [];

    this.create = ( model ) => {
        // Reset used values array
        this.usedValues = [];
        let nodeText = this.originalText;
        const regexp = /{{\s*(\w+)\s*}}/g;
        
        let matchResult = null;
        while ( ( matchResult = regexp.exec( nodeText ) ) !== null ) {

            // Replace all {{}} with their data values
            nodeText = nodeText.slice( 0, matchResult.index ) + 
                model.data[matchResult[1]] + 
                nodeText.slice( matchResult.index + matchResult[0].length );
            
            this.usedValues.push( matchResult[1] );
        }

        this.node.data = nodeText;
    }

    this.update = ( model, changedValue ) => {
        console.log( this.usedValues );
        if ( this.usedValues.indexOf( changedValue ) === -1 ) return;
        this.create( model );
    }
}