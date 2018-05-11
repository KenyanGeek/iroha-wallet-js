/* eslint-disable no-unused-vars */
import fs from 'fs'
import path from 'path'
import iroha from 'iroha-lib'
import irohaUtil from '../src/util/iroha-util'

const crypto = new iroha.ModelCrypto()
const alicePrivKeyHex = fs.readFileSync(path.join(__dirname, 'alice@test.priv')).toString().trim()
const alicePubKey = crypto.fromPrivateKey(alicePrivKeyHex).publicKey()
const adminPrivKeyHex = fs.readFileSync(path.join(__dirname, 'admin@test.priv')).toString().trim()
const adminPubKey = crypto.fromPrivateKey(adminPrivKeyHex).publicKey()

const nodeIp = '51.15.244.195:50051'

irohaUtil.login('admin@test', adminPrivKeyHex, nodeIp)
  .then(() => irohaUtil.createAccount('alice', 'test', alicePubKey))
  .then(() => irohaUtil.transferAsset('admin@test', 'alice@test', 'coolcoin#test', '', '100.00'))
  .then(() => console.log('done!'))
  .catch(err => console.error(err))
