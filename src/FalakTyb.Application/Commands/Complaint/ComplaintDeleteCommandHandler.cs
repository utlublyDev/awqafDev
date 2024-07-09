
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ComplaintDeleteCommandHandler : IRequestHandler<ComplaintDeleteCommand, Unit>
    {
        private IComplaintRepository _complaintRepository;

        public ComplaintDeleteCommandHandler(
            IComplaintRepository complaintRepository)
        {
            _complaintRepository = complaintRepository;
        }

        public async Task<Unit> Handle(ComplaintDeleteCommand command, CancellationToken cancellationToken)
        {
            await _complaintRepository.DeleteByIdAsync(command.Id);
            await _complaintRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
