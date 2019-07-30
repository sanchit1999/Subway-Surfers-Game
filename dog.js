/// <reference path="webgl.d.ts" />

let Dog = class {
    constructor(gl, pos, url) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.speedx = 0;
        this.positions = [];
		const textureCoordinates = [];
        const indices = [];
        for(var z = 0; z < 0.5 ; z += 0.02)
        {
            var x = 0;
            var y = -0.3;
            for(var i = 0; i < 10; i++)
            {
                this.positions.push(0);
                this.positions.push(0);
                this.positions.push(z);

                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z);
                
                y = y + 3 / 50;
                x = Math.sqrt(0.09 - y * y);
                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z);

                indices.push(3 * i + z * 3000);
                indices.push(3 * i + 1 + z * 3000);
                indices.push(3 * i + 2 + z * 3000);

            }
            x = 0;
            y = 0.3;
            for(var i = 10; i < 20; i++)
            {
                this.positions.push(0);
                this.positions.push(0);
                this.positions.push(z);
                
                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z);
                
                y = y - 3 / 50;
                x = -Math.sqrt(0.09 - y * y);
                
                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z);

                indices.push(3 * i + z * 3000);
                indices.push(3 * i + 1 + z * 3000);
                indices.push(3 * i + 2 + z * 3000);

            }
        }
        var rad = 0.3;
        for(var z = 0; z < 1 ; z += 0.02)
        {
            var x = 0;
            rad -= 0.006;
            var y = -rad;
            for(var i = 0; i < 10; i++)
            {
                this.positions.push(0);
                this.positions.push(0);
                this.positions.push(z + 0.5);

                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z + 0.5);
                
                y = y + rad / 5;
                x = Math.sqrt(rad * rad - y * y);
                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z + 0.5);

                indices.push(3 * i + z * 3000 + 1500);
                indices.push(3 * i + 1 + z * 3000 + 1500);
                indices.push(3 * i + 2 + z * 3000 + 1500);

            }
            x = 0;
            y = rad;
            for(var i = 10; i < 20; i++)
            {
                this.positions.push(0);
                this.positions.push(0);
                this.positions.push(z + 0.5);
                
                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z + 0.5);
                
                y = y - rad / 5;
                x = -Math.sqrt(rad * rad - y * y);
                
                this.positions.push(x);
                this.positions.push(y);
                this.positions.push(z + 0.5);

                indices.push(3 * i + z * 3000 + 1500);
                indices.push(3 * i + 1 + z * 3000 + 1500);
                indices.push(3 * i + 2 + z * 3000 + 1500);

            }
        }

        this.texture = loadTexture(gl, url);
        this.rotation = 0;
        this.pos = pos;
        this.speed = 0;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);


        for(var i = 0 ; i < 2250 ; i++)
        {
            textureCoordinates.push(0);
            textureCoordinates.push(0);
            textureCoordinates.push(1);
            textureCoordinates.push(0);
            textureCoordinates.push(1);
            textureCoordinates.push(1);
            textureCoordinates.push(1);
            textureCoordinates.push(0);
        }

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

    drawDog(gl, projectionMatrix, programInfo, deltaTime) {

        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        
        //this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        // mat4.rotate(modelViewMatrix,
        //     modelViewMatrix,
        //     -Math.PI / 2,
        //     [0, 1, 0]);

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
            const vertexCount = 4500;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
    tick(down_key) 
    {
    	this.pos[2] += 0.45;
    	this.speed -= 0.03;
    	this.pos[1] += this.speed;
    	if(down_key && this.pos[1] < 0.3) this.pos[1] = 0.3;
    	else if(!down_key && this.pos[1] < 1) this.pos[1] = 1;
        if(this.speedx != 0)
        {    
            if(this.pos[0] >= -4 && this.pos[0] <= 0)
            {
                this.pos[0] += this.speedx;
                if(this.pos[0] < -4) this.pos[0] = -4;
                if(Math.abs(this.pos[0]) < 0.01) this.pos[0] = 0;
                if(this.pos[0] == 0 || this.pos[0] == -4) this.speedx = 0;
            } 
            else if(this.pos[0] >= 0 && this.pos[0] <= 4)
            {
                this.pos[0] += this.speedx;
                if(this.pos[0] > 4) this.pos[0] = 4;
                if(Math.abs(this.pos[0]) < 0.01) this.pos[0] = 0;
                if(this.pos[0] == 4 || this.pos[0] == 0) this.speedx = 0;  
            }
        }       
    }
    tick2() 
    {
    	this.pos[2] += 1.8;
    	this.pos[1] = 6;
        if(this.speedx != 0)
        {    
            if(this.pos[0] >= -4 && this.pos[0] <= 0)
            {
                this.pos[0] += this.speedx;
                if(this.pos[0] < -4) this.pos[0] = -4;
                if(Math.abs(this.pos[0]) < 0.01) this.pos[0] = 0;
                if(this.pos[0] == 0 || this.pos[0] == -4) this.speedx = 0;
            } 
            else if(this.pos[0] >= 0 && this.pos[0] <= 4)
            {
                this.pos[0] += this.speedx;
                if(this.pos[0] > 4) this.pos[0] = 4;
                if(Math.abs(this.pos[0]) < 0.01) this.pos[0] = 0;
                if(this.pos[0] == 4 || this.pos[0] == 0) this.speedx = 0;  
            }
        }    
    }
    tick3() 
    {
        this.pos[2] += 0.45;
        this.speed -= 0.03;
        this.pos[1] += this.speed;
        if(this.pos[1] < 4.8)
            this.pos[1] = 4.8;
        if(this.speedx != 0)
        {    
            if(this.pos[0] >= -4 && this.pos[0] <= 0)
            {
                this.pos[0] += this.speedx;
                if(this.pos[0] < -4) this.pos[0] = -4;
                if(Math.abs(this.pos[0]) < 0.01) this.pos[0] = 0;
                if(this.pos[0] == 0 || this.pos[0] == -4) this.speedx = 0;
            } 
            else if(this.pos[0] >= 0 && this.pos[0] <= 4)
            {
                this.pos[0] += this.speedx;
                if(this.pos[0] > 4) this.pos[0] = 4;
                if(Math.abs(this.pos[0]) < 0.01) this.pos[0] = 0;
                if(this.pos[0] == 4 || this.pos[0] == 0) this.speedx = 0;  
            }
        }      
    }
};