import { ProposalCard } from '../../Components/ProposalCard/ProposalCard';
import { useLocation } from 'react-router-dom';
import './ProposalPage.css';

export const ProposalPage = () => {
    const location = useLocation();
    const riskProfile = location.state?.riskProfile;

    const mockProposal = {
        title: "Moderate Growth Portfolio",
        description: "A balanced mix of stocks and bonds suitable for medium-term investors with moderate risk tolerance.",
        riskLevel: "Moderate",
        suggestedAllocation: [
            { asset: "US Stocks", percentage: 10 },
            { asset: "International Stocks", percentage: 50 },
            { asset: "Bonds", percentage: 30 },
            { asset: "Cash", percentage: 10 }
        ]
    };

    return (
        <div className="proposal-page">
            <h2>Suggested Investment Plan</h2>
            <ProposalCard proposal={mockProposal} />
        </div>
    );
};
