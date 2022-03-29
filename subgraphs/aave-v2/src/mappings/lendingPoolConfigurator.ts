import { ReserveInitialized } from '../../generated/templates/LendingPoolConfigurator/LendingPoolConfigurator'
import { Market } from '../../generated/schema'
import { getOrCreateAsset } from '../helpers/asset'
import { AAVE_V2_REGISTRY, zeroBD, zeroInt } from '../helpers/generic'
import { getOrCreateProtocol } from '../helpers/protocol'

export function handleReserveInitialized(event: ReserveInitialized): void {
    let protocol = getOrCreateProtocol(AAVE_V2_REGISTRY)
    let market = new Market(event.params.asset.toHexString())
    let asset = getOrCreateAsset(event.params.asset.toHexString())
    let aTokenAsset = getOrCreateAsset(event.params.aToken.toHexString())
    market.protocol = protocol.id
    market.asset = asset.id
    market.name = asset.name
    market.symbol = asset.symbol
    market.collateralBackedAsset = aTokenAsset.id
    market.stableInterestDebtToken = event.params.stableDebtToken
    market.variableInterestDebtToken = event.params.variableDebtToken
    market.deposited = zeroBD
    market.borrowed = zeroBD
    market.interestRateModelAddress = event.params.interestRateStrategyAddress
    market.collateralFactor = zeroBD
    market.exchangeRate = zeroBD
    market.liquidityRate = zeroInt
    market.liquidityIndex = zeroInt
    market.stableBorrowRate = zeroInt
    market.variableBorrowRate = zeroInt
    market.variableBorrowIndex = zeroInt

    market.save();
}