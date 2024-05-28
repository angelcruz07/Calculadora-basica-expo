import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from 'react-native'

export default function Calculadora() {
	const [firstValue, setFirstValue] = useState('')
	const [secondValue, setSecondValue] = useState('')
	const [result, setResult] = useState(0)

	const clear = () => {
		setFirstValue('')
		setSecondValue('')
		setResult(0)
	}

	const sum = () => {
		setResult(parseFloat(firstValue) + parseFloat(secondValue))
	}

	const subtract = () => {
		setResult(parseFloat(firstValue) - parseFloat(secondValue))
	}

	const multiply = () => {
		setResult(parseFloat(firstValue) * parseFloat(secondValue))
	}

	const divide = () => {
		setResult(parseFloat(firstValue) / parseFloat(secondValue))
	}

	const percent = () => {
		setResult(parseFloat(firstValue) / 100)
	}

	const equal = () => {}

	const handlePress = (num) => {
		setFirstValue(firstValue + num)
	}

	const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
	const operations = [
		{ label: '+', onPress: sum },
		{ label: '-', onPress: subtract },
		{ label: '*', onPress: multiply },
		{ label: '/', onPress: divide },
		{ label: '=', onPress: equal }
	]
	const topButtons = [
		{ label: 'AC', onPress: clear },
		{ label: '=', onPress: equal },
		{ label: '%', onPress: percent }
	]

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={setFirstValue}
				value={firstValue}
				keyboardType='numeric'
			/>

			<View style={styles.containerNumbers}>
				<View style={styles.keyboard}>
					{buttons.map((button) => (
						<TouchableOpacity
							key={button}
							style={styles.buttonNumbers}
							onPress={() => handlePress(button)}>
							<Text style={styles.text}>{button}</Text>
						</TouchableOpacity>
					))}
				</View>
				<View style={styles.operations}>
					{operations.map((operation) => (
						<TouchableOpacity
							key={operation.label}
							style={styles.buttonOperations}
							onPress={operation.onPress}>
							<Text style={styles.text}>{operation.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 16,
		backgroundColor: '#000'
	},
	containerNumbers: {
		flexDirection: 'row'
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		color: '#fff',
		paddingHorizontal: 10
	},
	topButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20
	},
	topButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF9F0A',
		padding: 10,
		width: '30%',
		height: 80,
		margin: '1%',
		borderRadius: 100
	},
	keyboard: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		width: '75%'
	},
	buttonNumbers: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#333333',
		padding: 10,
		width: '30%',
		height: 80,
		margin: '1%',
		borderRadius: 100
	},
	operations: {
		justifyContent: 'space-between',
		marginLeft: '2%'
	},
	buttonOperations: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF9F0A',
		padding: 10,
		width: 80,
		height: 80,
		marginBottom: 10,
		borderRadius: 100
	},
	text: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 40
	}
})
