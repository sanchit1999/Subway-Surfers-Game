/// <reference path="webgl.d.ts" />

coins = class {
    constructor(gl, pos, url) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.texture = loadTexture(gl, url);
        this.captureflag = 0;
        this.dirx = 0;
        this.diry = 0;
        this.dirz = 0;
        this.positions = [
             // Front face
             -0.6, -0.6, 0.005,
             0.6, -0.6, 0.005,
             0.6, 0.6, 0.005,
             -0.6, 0.6, 0.005,
             //Back Face
             -0.6, -0.6, -0.005,
             0.6, -0.6, -0.005,
             0.6, 0.6, -0.005,
             -0.6, 0.6, -0.005,
             //Top Face
             -0.6, 0.6, -0.005,
             0.6, 0.6, -0.005,
             0.6, 0.6, 0.005,
             -0.6, 0.6, 0.005,
             //Bottom Face
             -0.6, -0.6, -0.005,
             0.6, -0.6, -0.005,
             0.6, -0.6, 0.005,
             -0.6, -0.6, 0.005,
             //Left Face
             -0.6, -0.6, -0.005,
             -0.6, 0.6, -0.005,
             -0.6, 0.6, 0.005,
             -0.6, -0.6, 0.005,
             //Right Face
             0.6, -0.6, -0.005,
             0.6, 0.6, -0.005,
             0.6, 0.6, 0.005,
             0.6, -0.6, 0.01,
        ];
        // const indices = [];
        this.flag = 1;

        const indices = [
            0, 1, 2,    0, 2, 3, // front
            4, 5, 6,    4, 6, 7,
            8, 9, 10,   8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23, 
        ];

        // var x = 0;
        // var y = -0.5;
        // var PI = 3.14159;
        // for(var i = 0; i < 10; i++)
        // {
        //     this.positions.push(0);
        //     this.positions.push(0);
        //     this.positions.push(0);
            
        //     this.positions.push(x);
        //     this.positions.push(y);
        //     this.positions.push(0);
            
        //     y = y + 1 / 10;
        //     x = Math.sqrt(0.25 - y * y);
        //     this.positions.push(x);
        //     this.positions.push(y);
        //     this.positions.push(0);

        //     indices.push(3 * i);
        //     indices.push(3 * i + 1);
        //     indices.push(3 * i + 2);

        // }
        // x = 0;
        // y = 0.5;
        // for(var i = 10; i < 20; i++)
        // {
        //     this.positions.push(0);
        //     this.positions.push(0);
        //     this.positions.push(0);
            
        //     this.positions.push(x);
        //     this.positions.push(y);
        //     this.positions.push(0);
            
        //     y = y - 1 / 10;
        //     x = -Math.sqrt(0.25 - y * y);
            
        //     this.positions.push(x);
        //     this.positions.push(y);
        //     this.positions.push(0);

        //     indices.push(3 * i);
        //     indices.push(3 * i + 1);
        //     indices.push(3 * i + 2);

        // }
        this.rotation = 0;
        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

        // const textureCoordinates = [];
        const textureCoordinates = [
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
          ];
        // for(var i = 0 ; i < 30 ; i++)
        // {
        //     textureCoordinates.push(0.0);
        //     textureCoordinates.push(0.0);
        //     textureCoordinates.push(1.0);
        //     textureCoordinates.push(0.0);
        //     textureCoordinates.push(1.0);
        //     textureCoordinates.push(1.0);
        //     textureCoordinates.push(0.0);
        //     textureCoordinates.push(1.0);
        // }
            
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);

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

    drawCoins(gl, projectionMatrix, programInfo, deltaTime) {

        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        
        this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [0, 1, 0]);
        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            Math.PI,
            [0, 0, 1]);
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
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
    tick(down_key){
    	this.rotation += 0.1;
    }
};