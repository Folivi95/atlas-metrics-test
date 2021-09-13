module.exports = (sequelize, Sequelize) => {
    const Emission = sequelize.define('emissions', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },

        productId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },

        emission: {
            type: Sequelize.FLOAT,
        },

        recordedAt: {
            type: Sequelize.DATE,
            defaultValue: null,
            allowNull: true,
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    Emission.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());

        return values;
    }
    return Emission;
}