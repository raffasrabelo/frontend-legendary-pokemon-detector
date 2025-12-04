import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# 1. Carregar Dataset
df = pd.read_csv('Pokemon.csv')

# 2. Selecionar Features (Atributos de batalha) e Target (Lendário)
# Vamos usar apenas os status numéricos
features = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed']
X = df[features]
y = df['Legendary'] # True ou False

# 3. Dividir em Treino e Teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Configurar e Treinar a Árvore de Decisão
clf = DecisionTreeClassifier(criterion='entropy', max_depth=5)
clf.fit(X_train, y_train)

# 5. Avaliação
predictions = clf.predict(X_test)
print("--- Resultados ---")
print(f"Acurácia: {accuracy_score(y_test, predictions)*100:.2f}%")
print("Relatório de Classificação:\n", classification_report(y_test, predictions))

# 6. Salvar modelo
joblib.dump(clf, '../backend/pokemon_model.pkl')
print("Modelo salvo em '../backend/pokemon_model.pkl'")