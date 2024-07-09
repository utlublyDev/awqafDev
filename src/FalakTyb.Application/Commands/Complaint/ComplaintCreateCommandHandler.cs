
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ComplaintCreateCommandHandler : IRequestHandler<ComplaintCreateCommand, Complaint>
    {
        private IComplaintRepository _complaintRepository;

        public ComplaintCreateCommandHandler(
            IComplaintRepository complaintRepository)
        {
            _complaintRepository = complaintRepository;
        }

        public async Task<Complaint> Handle(ComplaintCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _complaintRepository.CreateOrUpdateAsync(command.Complaint);
            await _complaintRepository.SaveChangesAsync();
            return entity;
        }
    }
}
