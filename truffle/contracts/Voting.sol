// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @title Decentralize Voting System
/// @author Martin Leclercq
/// @notice This smart contract is a decentralized voting system and allow authorize voter to propose and vote for a proposal


contract Voting is Ownable {

    uint public winningProposalID;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description; 
        uint voteCount;
    }

    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }


    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping (address => Voter) voters;


    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //

   
    /// @notice Calculate tree age in years, rounded up, for live trees
    /// @dev Modifier : onlyVoters from Ownable is used
    /// @param _addr is the voter address
    /// @return voters[_addr] get a voter address in voters mapping 

    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }

    /// @notice this function get one Proposal
    /// @dev Modifier : onlyVoters from Ownable is used
    /// @param _id is the proposal id form the proposalsArray
    /// @return proposalsArray[_id] get one specific proposal form the proposalsArray with an id
    
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 

    /// @notice this function allow the owner to add voters
    /// @dev Require : it can work only with the RegisteringVoters WorkflowStatus
    /// @dev Require : The voter can't be already registered
    /// @param _addr is the voter address
    /// @custom:event it return an VoterRegistered event with addresse in paramater

    function addVoter(address _addr) external  {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
        
    }
 
    // ::::::::::::: PROPOSAL ::::::::::::: // 

    /// @notice This function allow Registered Voters to add proposal
    /// @dev Modifier : onlyVoters from Ownable is used
    /// @dev Require : the ProposalsRegistrationStarted WorkflowStatus have to be set
    /// @dev Require : the Proposal can't be empty
    /// @dev DOS protection : we limit the proposal number to 100 to avoid DOS attack
    /// @param _desc is the voter address
    /// @custom:event it return an ProposalRegistered event with proposalsArray id parameter
    
    function addProposal(string memory _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif

        // Dos protection, we limit the array size to 100 poroposals
        require(proposalsArray.length <= 100, "you reach the maximum proposal" );

        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /// @notice This function allow Registered Voters to vote for a proposal
    /// @dev Modifier : onlyVoters from Ownable is used
    /// @dev Require : the VotingSessionStarted WorkflowStatus have to be set
    /// @dev Require : The voters can't vote twice
    /// @dev Require : The voters can vote only if the proposal exist in the proposal array
    /// @param _id is the id of a proposal stocked in the proposal Array
    /// @custom:event it return an Voted event with the msg.sender and the proposal id as parameter

    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /// @notice This function set the RegisteringVoters WorkflowStatus
    /// @dev only the Owner can change the status
    /// @dev Require : The workflowStatus have to be the previous of the one we want to set
    /// @custom:event it return an WorkflowStatusChange with the previous status and the new one

    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /// @notice This function set the endProposalsRegistering WorkflowStatus
    /// @dev only the Owner can change the status
    /// @dev Require : The workflowStatus have to be the previous of the one we want to set
    /// @custom:event it return an WorkflowStatusChange with the previous status and the new one

    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /// @notice This function set the startVotingSession WorkflowStatus
    /// @dev only the Owner can change the status
    /// @dev Require : The workflowStatus have to be the previous of the one we want to set
    /// @custom:event it return an WorkflowStatusChange with the previous status and the new one

    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /// @notice This function set the endVotingSession WorkflowStatus
    /// @dev only the Owner can change the status
    /// @dev Require : The workflowStatus have to be the previous of the one we want to set
    /// @custom:event it return an WorkflowStatusChange with the previous status and the new one

    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }


    /// @notice This function announce the winning porposal id
    /// @dev only the Owner can change the status
    /// @dev Require : the VotingSessionEnded WorkflowStatus have to be set
    /// @custom:event it return an WorkflowStatusChange with the previous status and the new one

    function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
       uint _winningProposalId;
      for (uint256 p = 0; p < proposalsArray.length; p++) {
           if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
               _winningProposalId = p;
          }
       }
       winningProposalID = _winningProposalId;
       
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}