import { useState } from "react";
import styles from './MultiplicatorStore.module.scss';

function MultiplicatorStore({ count, setCount, multiplicator, setMultiplicator }) {
  // Calculate the cost of the next multiplicator
  const calculateCost = (currentMultiplicator) => {
    return 100 * currentMultiplicator * currentMultiplicator; // Cost increases quadratically with each level
  };

  // Check if the user can afford the next multiplicator
  const canAfford = count >= calculateCost(multiplicator);

  // Handle buying the next multiplicator
  const buyMultiplicator = () => {
    if (canAfford) {
      const nextMultiplicator = multiplicator + 1;
      const cost = calculateCost(multiplicator);
      setMultiplicator(nextMultiplicator);
      setCount(count - cost);
    }
  };

  return (
    <div className={styles.multiplicatorStore}>
      <div 
        className={`${styles.multiplicatorStore_item} ${!canAfford ? styles.disabled : ''}`} 
        onClick={canAfford ? buyMultiplicator : undefined}
        role="button" // Accessibility improvement
        aria-disabled={!canAfford} // Accessibility improvement
        tabIndex={canAfford ? 0 : -1} // Accessibility improvement
      >
        Buy Multiplicator {multiplicator + 1} for {calculateCost(multiplicator)}
      </div>
    </div>
  );
}

export default MultiplicatorStore;
