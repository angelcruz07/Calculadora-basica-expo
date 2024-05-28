import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Button
} from 'react-native';
import * as Speech from 'expo-speech'


export default function Calculadora() {
	const [input, setInput] = useState<string>('');
	const [result, setResult] = useState<string | null>(null);

	const clear = () => {
		setInput('');
		setResult(null);
	};

	const handleNumberPress = (num: string) => {
		setInput((prevInput) => prevInput + num);
	};

	const handleOperationPress = (operation: string) => {
		const lastChar = input.slice(-1);
		if ('+-*/'.includes(lastChar)) {
			// Replace last operation if user enters two operations in a row
			setInput(input.slice(0, -1) + operation);
		} else {
			setInput(input + operation);
		}
	};

	const calculate = () => {
		try {
			// Using eval for simplicity; consider a safer alternative for production
			const evalResult = eval(input); 
			setResult(evalResult.toString());
		} catch (e) {
			setResult('Error syntax');
		}
	};

	const percent = () => {
		try {
			const percentage = parseFloat(input) / 100;
			setResult(percentage.toString());
			setInput('');
		} catch (e) {
			setResult('Error');
		}
	};

	const speakHResult = () => {
		const thingToSay = result !== null ? result : input;
		Speech.speak(thingToSay, { language: 'es-MX' });
	}

	const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const operations = ['+', '-', '*', '/'];

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				editable={false}
				value={result !== null ? result : input}
			/>
			<View style={styles.topButtons}>
				<TouchableOpacity style={styles.topButton} onPress={clear}>
					<Text style={styles.text}>AC</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.topButton} onPress={percent}>
					<Text style={styles.text}>%</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.topButton} onPress={calculate}>
					<Text style={styles.text}>=</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.containerNumbers}>
				<View style={styles.keyboard}>
					{buttons.map((button) => (
						<TouchableOpacity
							key={button}
							style={styles.buttonNumbers}
							onPress={() => handleNumberPress(button)}
						>
							<Text style={styles.text}>{button}</Text>
						</TouchableOpacity>
					))}
					<View style={styles.buttonSpeech}>
						<Button title="Leer el resultado" onPress={speakHResult} />
					</View>
				</View>
				<View style={styles.operations}>
					{operations.map((operation) => (
						<TouchableOpacity
							key={operation}
							style={styles.buttonOperations}
							onPress={() => handleOperationPress(operation)}
						>
							<Text style={styles.text}>{operation}</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</View>
	);
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
		height: 60,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		color: '#fff',
		paddingHorizontal: 10,
		fontSize: 30
	},
	topButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20
	},
	topButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D5D5D3',
		padding: 5,
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
	buttonSpeech: {
		backgroundColor: '#333333',
		padding: 10,
		borderRadius: 100,
		justifyContent: 'center',
		color: '#fff'
	}, 
	text: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 40
	}
});
