/// <reference path="webgl.d.ts" />

let Legs = class {
    constructor(gl, pos, url) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.speedx = 0;
        this.positions = [

            -1, -0.75, -0.15,
             -0.7, -0.75, -0.15,
             -0.7, 0, -0.15,
             -1, 0, -0.15,
             //Back Face
             -1, -0.75, 0.15,
             -0.7, -0.75, 0.15,
             -0.7, 0, 0.15,
             -1, 0, 0.15,
             //Top Face
             -1, 0, 0.15,
             -0.7, 0, 0.15,
             -0.7, 0, -0.15,
             -1, 0, -0.15,
             //Bottom Face
             -1, -0.75, 0.15,
             -0.7, -0.75, 0.15,
             -0.7, -0.75, -0.15,
             -1, -0.75, -0.15,
             //Left Face
             -1, -0.75, 0.15,
             -1, 0, 0.15,
             -1, 0, -0.15,
             -1, -0.75, -0.15,
             //Right Face
             -0.7, -0.75, 0.15,
             -0.7, 0, 0.15,
             -0.7, 0, -0.15,
             -0.7, -0.75, -0.15,

             /////////

             1, -0.75, -0.15,
             0.7, -0.75, -0.15,
             0.7, 0, -0.15,
             1, 0, -0.15,
             //Back Face
             1, -0.75, 0.15,
             0.7, -0.75, 0.15,
             0.7, 0, 0.15,
             1, 0, 0.15,
             //Top Face
             1, 0, 0.15,
             0.7, 0, 0.15,
             0.7, 0, -0.15,
             1, 0, -0.15,
             //Bottom Face
             1, -0.75, 0.15,
             0.7, -0.75, 0.15,
             0.7, -0.75, -0.15,
             1, -0.75, -0.15,
             //Left Face
             1, -0.75, 0.15,
             1, 0, 0.15,
             1, 0, -0.15,
             1, -0.75, -0.15,
             //Right Face
             0.7, -0.75, 0.15,
             0.7, 0, 0.15,
             0.7, 0, -0.15,
             0.7, -0.75, -0.15,

        ];
		const textureCoordinates = [];

        for(var i = 0 ; i < 36 ; i++ )
        {
            textureCoordinates.push(0.5);
            textureCoordinates.push(0);
            textureCoordinates.push(1);
            textureCoordinates.push(0);
            textureCoordinates.push(1);
            textureCoordinates.push(1);
            textureCoordinates.push(0.5);
            textureCoordinates.push(1);
        }
        const indices = [];
        for(var i = 0 ; i < 48 ; i += 4)
        {
            indices.push(i);
            indices.push(i + 1);
            indices.push(i + 2);

            indices.push(i);
            indices.push(i + 2);
            indices.push(i + 3);
        }

        this.texture = loadTexture(gl, url);
        this.rotation = 0;
        this.pos = pos;
        this.speed = 0;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.
        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
    		textureCoord: textureCoordBuffer,
            indices: indexBuffer,
        }

    }

    drawLegs(gl, projectionMatrix, programInfo, deltaTime) {

        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        
        this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            -Math.PI / 2,
            [0, 1, 0]);

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
		    const num = 2; // every coordinate composed of 2 values
		    const type = gl.FLOAT; // the data in the buffer is 32 bit float
		    const normalize = false; // don't normalize
		    const stride = 0; // how many bytes to get from one set to the next
		    const offset = 0; // how many bytes inside the buffer to start from
		    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
		    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
		    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
		}
	    
	    // Tell WebGL we want to affect texture unit 0
  		gl.activeTexture(gl.TEXTURE0);

	    // Bind the texture to texture unit 0
	    gl.bindTexture(gl.TEXTURE_2D, this.texture);

	    // Tell the shader we bound the texture to texture unit 0
	    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing
        gl.useProgram(programInfo.program);

        // Set the shader uniforms
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            const vertexCount = 72;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
    tick(val) {

        if(val == 5)
            this.pos[1] += 0.25;
        else if(val == 10)
            this.pos[1] -= 0.25;
    }
};