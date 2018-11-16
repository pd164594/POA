        // remix URL: "http://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js"

   

        if (typeof web3 != 'undefined') {
          web3 = new Web3(web3.currentProvider);
        } else {
          web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        }
      

        web3.eth.defaultAccount = web3.eth.accounts[0];

        console.log(web3.eth.accounts);

        // Adding the contracts ABI. //Add your contract ABI in between parenthesis. 
        const ProofOfExistenceContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"proof","type":"bytes32"}],"name":"storeProof","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"document","type":"string"}],"name":"notarize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"document","type":"string"}],"name":"proofFor","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"document","type":"string"}],"name":"checkDocument","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"proof","type":"bytes32"}],"name":"hasProof","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}])

        // Defining the address of where my smart contract is located. 
        const ProofOfExistence = ProofOfExistenceContract.at("0xaf779cb513d7e1f7014155ecbed4cbb95a39b9e1");



        // This function hits the Registrar Set Student using Jquery
      $("#submit").click(function() {
        var word = $("#notarize").val();
       
        console.log("our word is, ", word)

        ProofOfExistence.notarize(word,{gas:3000000}, (err, res) =>{
          console.log("this is my result", res);
            ProofOfExistence.proofFor(word, (err, res) => {
              console.log("My Hash value", res)
              $("#myHash").html("This is your unique value, " + res)
            })


        //   if(err){
        //     console.log(err)
        //     alert("Only the ND Registrar can Post Grades");
        //   } else {
        //     console.log(res)
        //     $("#transactionText").show();
        //     $("#transactionID").html(res);
        
          })
        });

        $("#exists").click(function(){
          var word = $("#checkDocument").val();

          ProofOfExistence.checkDocument(word, (err, res) => {
            console.log('this is my doc check res, ', res);
            $("#documentExists").html('This word exists in our contract: ' + res)

          })


        })

        

        
    
   